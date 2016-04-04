"use strict";
(new function () {
    const Color = net.brehaut.Color;

    class IIinterfacable {
        constructor(interfaceObj, methods) {
            if (new.target === IIinterfacable) {
                throw new TypeError(`Невозможно создать объект класса-интерфейса '${this.constructor.name}'`);
            }
            if ((!interfaceObj) || (!methods) || (methods.length === 0)) {
                throw new TypeError(`Класс-интерфейс '${new.target.name}' должен добавлять новую функциональность к классу-интерфейсу '${this.__proto__.__proto__.constructor.name}'`);
            }
            if (new.target === interfaceObj) {
                throw new TypeError(`Невозможно создать объект класса-интерфейса '${new.target.name}'`);
            }
            for (let method of methods) {
                if (!this[method]) {
                    throw new TypeError(`Необходимо определить метод '${method}' класса '${new.target.name}'`);
                }
            }
        }
    }

    class IAnimatable extends IIinterfacable {
        constructor() {
            super(IAnimatable, ['draw', 'animate']);
        }
    }

    class IPlayable extends IIinterfacable {
        constructor() {
            super(IPlayable, ['start', 'pause', 'reset', 'action', '_destroy']);
        }
    }

    class Background extends IAnimatable {
        constructor(ctx, gl) {
            super();
            this._ctx = ctx;
            this._gl = gl;
            console.log('Background класс создан');
        }

        draw() {
            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;
            let offsetX = viewportWidth / 2;
            let offsetY = viewportHeight * 1.1;
            let outerRadius = Math.max(viewportHeight, viewportWidth) * 1.5;
            let innerRadius = outerRadius * 0.02 + 5;

            let first = 280 / outerRadius;
            let second = 420 / outerRadius;
            let gr = this._ctx.createRadialGradient(offsetX, offsetY, innerRadius, offsetX, offsetY, outerRadius);
            gr.addColorStop(0, '#66B');
            gr.addColorStop(first, '#1C1C29');
            gr.addColorStop(second, '#0A0A1A');
            gr.addColorStop(0.8, '#020209');
            this._ctx.fillStyle = gr;

            this._ctx.fillRect(0, 0, viewportWidth, viewportHeight);
        }

        animate() {

        }
    }

    class Capture extends IAnimatable {
        constructor(ctx, gl) {
            super();
            this._ctx = ctx;
            this._gl = gl;
            this._elem = document.getElementById('capture');
            console.log('Capture класс создан');
        }

        draw() {

        }

        animate() {

        }

        _setCapture(newCapture) {
            this._elem.innerText = newCapture;
            console.log('New capture: ' + newCapture);
        }
    }

    class Star extends IAnimatable {
        constructor(ctx, gl, settings) {
            super();
            this._ctx = ctx;
            this._gl = gl;
            this._settings = settings;

            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;

            this._star = {
                x: viewportWidth * Math.random(),
                y: viewportHeight * Math.random(),
                r: this._settings.MIN_R + this._settings.D_R * Math.random(),
                blink_period: this._settings.BLINK_PERIOD_MIN + this._settings.BLINK_PERIOD_D * Math.random(),
                blink_angle: this._settings.BLINK_PERIOD_MIN * Math.random(),
                vx: this._settings.D_X * Math.random(),
                vy: this._settings.D_Y * Math.random()
            };

            console.log('Star класс создан');
        }

        draw() {
            this._ctx.beginPath();
            this._ctx.arc(this._star.x, this._star.y, this._star.r, 0, Math.PI * 2, true);
            this._ctx.closePath();

            let r = (this._star.blink_angle / this._star.blink_period) - 0.5;
            let gr = this._ctx.createRadialGradient(this._star.x, this._star.y, 0, this._star.x, this._star.y, this._star.r);
            gr.addColorStop(0.0, 'rgba(255,255,255,0.9)');
            if (r < 0) {
                gr.addColorStop(0.65 + r, 'rgba(77,101,181,0.4)');
            } else {
                gr.addColorStop(0.65 - r, 'rgba(77,101,181,0.4)');
            }
            gr.addColorStop(1.0, 'rgba(0,0,0,0)');
            this._ctx.fillStyle = gr;
            this._ctx.fill();
        }

        animate(time) {
            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;
            this._star.x += (this._star.vx < 0 ? -1 : 1) * time / 100;
            this._star.y += (this._star.vy < 0 ? -1 : 1) * time / 100;
            this._star.vx += this._settings.D_X * (Math.random() - 0.5) * time / 10;
            this._star.vy += this._settings.D_Y * (Math.random() - 0.5) * time / 10;
            this._star.blink_angle += time;
            this._star.blink_angle %= this._star.blink_period;
            if (this._star.x < 0 || this._star.x - viewportWidth > 15) {
                this._star.x = viewportWidth * Math.random();
                this._star.vx = 0;
                this._star.vy = 0;
            }
            if (this._star.y < 0 || this._star.y - viewportHeight > 15) {
                this._star.y = viewportHeight * Math.random();
                this._star.vx = 0;
                this._star.vy = 0;
            }

            if (this._star.vx < -this._settings.D_X || this._star.vx > this._settings.D_X) {
                this._star.vx /= 2;
            }
            if (this._star.vy < -this._settings.D_Y || this._star.vy > this._settings.D_Y) {
                this._star.vy /= 2;
            }
        }

        _respawn(viewportWidth, viewportHeight) {
            this._star.x = viewportWidth * Math.random();
            this._star.y = viewportHeight * Math.random();
        }
    }

    class StarsCollection extends IAnimatable {
        constructor(ctx, gl, settings) {
            super();
            this._settings = settings;
            this._ctx = ctx;
            this._gl = gl;

            this._stars = new Array(this._settings.MAX_STARS_COUNT);
            for (let i = 0; i < this._stars.length; i++) {
                this._stars[i] = new Star(this._ctx, this._gl, this._settings.STAR_SETTINGS);
            }
            window.addEventListener('resize', this._respawnAll.bind(this));
            console.log('StarsCollection класс создан');
        }

        draw() {
            this._stars.forEach((star) => star.draw());
        }

        animate(time) {
            this._stars.forEach((star) => star.animate(time));
        }

        _respawnAll() {
            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;
            this._stars.forEach((star) => star._respawn(viewportWidth, viewportHeight));
        }
    }

    class Block extends IAnimatable {
        constructor(ctx, gl, settings, type, {x_size, z_size, x_shift, z_shift, cross, height, color}) {
            super();
            this._ctx = ctx;
            this._gl = gl;
            this._settings = settings;
            this._shader = this._gl._shader;

            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;

            this._type = type;

            this._properties = {
                x_size: x_size,
                z_size: z_size,
                height: height,
                x_shift: x_shift,
                z_shift: z_shift,
                x_pos: 0,
                z_pos: 0,
                y_shift: 0,
                cross: cross,
                color: new Color(color)
            };
            this._ampl = this._settings.STANDART_DIM * this._settings.AMPLITUDE;
            if (this._type === Block.types.HEADER) {
                let prop = {
                    x_size: this._properties.x_size,
                    z_size: this._properties.z_size,
                    x_shift: this._properties.x_shift,
                    z_shift: this._properties.z_shift
                };
                this._fix(prop);
            } else {
                if (this._properties.cross === Block.crosses.X_BASED) {
                    this._properties.z_pos = this._properties.z_shift;
                    this._properties.x_pos = -this._settings.STANDART_DIM * this._settings.AMPLITUDE;
                } else {
                    this._properties.x_pos = this._properties.x_shift;
                    this._properties.z_pos = -this._settings.STANDART_DIM * this._settings.AMPLITUDE;
                }
            }

            this.indexes = [
                0, 1, 2, 0, 2, 3,    // Front face
                4, 5, 6, 4, 6, 7,    // Back face
                8, 9, 10, 8, 10, 11,  // Top face
                12, 13, 14, 12, 14, 15, // Bottom face
                16, 17, 18, 16, 18, 19, // Right face
                20, 21, 22, 20, 22, 23  // Left face
            ];
            let currColor = this._properties.color;
            let colorMass = [currColor.getRed(), currColor.getGreen(), currColor.getBlue(), 1.0];
            this.unpackedColors = [];
            for (var j = 0; j < 24; j++) {
                this.unpackedColors = this.unpackedColors.concat(colorMass);
            }

            this.vertexNormals = [
                // Front face
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                // Back face
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                // Top face
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                // Bottom face
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                // Right face
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                // Left face
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
            ];
            console.log('Block класс создан');
        }

        draw(y_pos, angle) {
            let viewportWidth = this._ctx.canvas.width;
            let viewportHeight = this._ctx.canvas.height;
            if (y_pos < -viewportHeight) {
                return;
            }

            let conv = 400;

            // buffers
            let cVertexPosBuffer = this._gl.createBuffer();
            let cVertexNormBuffer = this._gl.createBuffer();
            let cVertexColorBuffer = this._gl.createBuffer();
            let cVertexIdxBuffer = this._gl.createBuffer();

            // positions
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexPosBuffer);
            let XN = this._properties.x_pos / conv - 0.5;
            let XX = (this._properties.x_pos + this._properties.x_size) / conv - 0.5;
            let ZN = this._properties.z_pos / conv - 0.5;
            let ZX = (this._properties.z_pos + this._properties.z_size) / conv - 0.5;
            let YX = 0;
            let YN = -this._properties.height / conv;
            let vertices = [
                // Front face
                XN, YN, ZX,
                XX, YN, ZX,
                XX, YX, ZX,
                XN, YX, ZX,

                // Back face
                XN, YN, ZN,
                XN, YX, ZN,
                XX, YX, ZN,
                XX, YN, ZN,

                // Top face
                XN, YX, ZN,
                XN, YX, ZX,
                XX, YX, ZX,
                XX, YX, ZN,

                // Bottom face
                XN, YN, ZN,
                XX, YN, ZN,
                XX, YN, ZX,
                XN, YN, ZX,

                // Right face
                XX, YN, ZN,
                XX, YX, ZN,
                XX, YX, ZX,
                XX, YN, ZX,

                // Left face
                XN, YN, ZN,
                XN, YN, ZX,
                XN, YX, ZX,
                XN, YX, ZN
            ];
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);
            cVertexPosBuffer.itemSize = 3;
            cVertexPosBuffer.numItems = 24;

            // normals
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexNormBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals), this._gl.STATIC_DRAW);
            cVertexNormBuffer.itemSize = 3;
            cVertexNormBuffer.numItems = 24;

            // colors
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexColorBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this.unpackedColors), this._gl.STATIC_DRAW);
            cVertexColorBuffer.itemSize = 4;
            cVertexColorBuffer.numItems = 24;

            // numbers
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, cVertexIdxBuffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), this._gl.STATIC_DRAW);
            cVertexIdxBuffer.itemSize = 1;
            cVertexIdxBuffer.numItems = 36;

            let mvM = mat4.create();
            let pM = mat4.create();
            mat4.perspective(45, this._gl.viewportWidth / this._gl.viewportHeight, 0.1, 100.0, pM);
            mat4.identity(mvM);
            mat4.translate(mvM, [0.0, y_pos / conv - 0.8, -6.0]);

            this._gl._shader.push(mvM);

            mat4.rotate(mvM, angle * Math.PI / 180, [0, 1, 0]);

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexPosBuffer);
            this._gl.vertexAttribPointer(this._gl._shader.getProgram().vertexPositionAttribute, cVertexPosBuffer.itemSize, this._gl.FLOAT, false, 0, 0);

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexNormBuffer);
            this._gl.vertexAttribPointer(this._gl._shader.getProgram().vertexNormalAttribute, cVertexNormBuffer.itemSize, this._gl.FLOAT, false, 0, 0);

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, cVertexColorBuffer);
            this._gl.vertexAttribPointer(this._gl._shader.getProgram().vertexColorAttribute, cVertexColorBuffer.itemSize, this._gl.FLOAT, false, 0, 0);

            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, cVertexIdxBuffer);
            this._gl._shader.setMatrixUniforms(pM, mvM);
            this._gl.drawElements(this._gl.TRIANGLES, cVertexIdxBuffer.numItems, this._gl.UNSIGNED_SHORT, 0);

            mvM = this._gl._shader.pop();
        }

        animate(time) {
            if (this._type === Block.types.ACTIVE) {
                if (this._properties.cross === Block.crosses.X_BASED) {
                    this._properties.x_pos += this._settings.STANDART_SPEED * time / 100;
                    if (this._properties.x_pos > this._ampl && this._settings.STANDART_SPEED > 0) {
                        this._settings.STANDART_SPEED *= -1;
                    }
                    if (this._properties.x_pos < -this._ampl && this._settings.STANDART_SPEED < 0) {
                        this._settings.STANDART_SPEED *= -1;
                    }
                    if (this._properties.x_pos > 2000) {
                        this._properties.x_pos = 1000;
                    }
                    if (this._properties.x_pos < -2000) {
                        this._properties.x_pos = -1000;
                    }
                } else {
                    this._properties.z_pos += this._settings.STANDART_SPEED * time / 100;
                    if (this._properties.z_pos > this._ampl && this._settings.STANDART_SPEED > 0) {
                        this._settings.STANDART_SPEED *= -1;
                    }
                    if (this._properties.z_pos < -this._ampl && this._settings.STANDART_SPEED < 0) {
                        this._settings.STANDART_SPEED *= -1;
                    }
                    if (this._properties.z_pos > 2000) {
                        this._properties.z_pos = 1000;
                    }
                    if (this._properties.z_pos < -2000) {
                        this._properties.z_pos = -1000;
                    }
                }
            }
        }

        _fix({x_size, z_size, x_shift, z_shift}) {
            let propetries = {};
            propetries.x_size = x_size;
            propetries.z_size = z_size;
            propetries.height = this._properties.height;
            propetries.cross = this._properties.cross;
            propetries.x_pos = x_shift;
            propetries.z_pos = z_shift;
            propetries.color = (new Color(this._properties.color)).saturateByAmount(0.2);
            this._properties = propetries;
            this._type = Block.types.FIXED;
            let currColor = this._properties.color;
            let colorMass = [currColor.getRed(), currColor.getGreen(), currColor.getBlue(), 1.0];
            this.unpackedColors = [];
            for (var j = 0; j < 24; j++) {
                this.unpackedColors = this.unpackedColors.concat(colorMass);
            }
        }


        static types() {
            Block.types.HEADER = 'HEADER';
            Block.types.ACTIVE = 'ACTIVE';
            Block.types.FIXED = 'FIXED';
        }

        static crosses() {
            Block.crosses.X_BASED = 'X_BASED';
            Block.crosses.Z_BASED = 'Z_BASED';
        }
    }

    class BlocksCollection extends IAnimatable {
        constructor(ctx, gl, settings) {
            super();
            this._settings = settings;
            this._ctx = ctx;
            this._gl = gl;

            this._shader = new Shaders(this._gl);
            this._shader.setFragmentShader('x-shader-fragment');
            this._shader.setVertexShader('x-shader-vertex');

            let shProgram = this._shader.createProgram();
            shProgram = this._setupShaderProgram(shProgram);
            this._shader.setProgram(shProgram);

            this._gl._shader = this._shader;

            this._COLORS = this._settings.BLOCK_SETTINGS.COLORS;

            let inits = {
                x_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                z_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                x_shift: 0,
                z_shift: 0,
                cross: Block.crosses.X_BASED,
                height: this._settings.BLOCK_SETTINGS.STANDART_HEIGHT,
                color: this._settings.BLOCK_SETTINGS.HEADER_COLOR
            };

            this._blocks = new Array(4);
            this._blocks[0] = new Block(this._ctx, this._gl, this._settings.BLOCK_SETTINGS, Block.types.HEADER, {
                x_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                z_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                x_shift: 0,
                z_shift: 0,
                height: this._settings.BLOCK_SETTINGS.STANDART_HEIGHT * 20,
                color: this._settings.BLOCK_SETTINGS.HEADER_COLOR
            });
            for (let i = 1; i < this._blocks.length; i++) {
                inits.color = inits.color.lightenByRatio(0.1);
                this._blocks[i] = new Block(this._ctx, this._gl, this._settings.BLOCK_SETTINGS, Block.types.HEADER, inits);
            }

            this._active = null;
            this._last = inits;
            this._comboRate = 0;


            console.log('BlocksCollection класс создан');
        }

        draw(angle) {
            const len = this._blocks.length;
            for (let i = 0; i < this._blocks.length; i++) {
                let y_pos = (i - len) * this._settings.BLOCK_SETTINGS.STANDART_HEIGHT;
                this._blocks[i].draw(y_pos, angle);
            }
            if (this._active) {
                this._active.draw(1, angle);
            }
        }

        animate(time) {
            this._blocks.forEach((block) => block.animate(time));
            if (this._active) {
                this._active.animate(time);
            }
        }

        _start() {
            let crossSeed = Math.floor(Math.random() * 2);
            let seed = {
                x_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                z_size: this._settings.BLOCK_SETTINGS.STANDART_DIM,
                x_shift: 0,
                z_shift: 0,
                cross: crossSeed === 0 ? Block.crosses.X_BASED : Block.crosses.Z_BASED,
                height: this._settings.BLOCK_SETTINGS.STANDART_HEIGHT,
                color: this._random_color()
            };
            this._active = new Block(this._ctx, this._gl, this._settings.BLOCK_SETTINGS, Block.types.ACTIVE, seed);
        }

        _random_color() {
            return this._COLORS[Math.floor(Math.random() * this._COLORS.length)];
        }

        _fixBlock() {
            let fix = {};
            let head = this._blocks[this._blocks.length - 1]._properties;
            fix.x_size = head.x_size;
            fix.z_size = head.z_size;
            fix.x_shift = head.x_pos;
            fix.z_shift = head.z_pos;

            if (this._active._properties.cross === Block.crosses.X_BASED) {
                let x_min = Math.max(head.x_pos, this._active._properties.x_pos);
                let x_max = Math.min(head.x_pos + head.x_size, this._active._properties.x_pos + this._active._properties.x_size);
                if (x_min < x_max) {
                    fix.x_shift = x_min;
                    fix.x_size = x_max - x_min;
                    this._active._fix(fix);
                    this._blocks.push(this._active);
                    this._active = null;
                } else {
                    fix.x_shift = this._active._properties.x_pos;
                    fix.z_shift = this._active._properties.z_pos;
                    fix.x_size = this._active._properties.x_size;
                    fix.z_size = this._active._properties.z_size;
                    this._active._fix(fix);
                    this._blocks.push(this._active);
                    this._active = null;
                    return false;
                }

            } else {
                let z_min = Math.max(head.z_pos, this._active._properties.z_pos);
                let z_max = Math.min(head.z_pos + head.z_size, this._active._properties.z_pos + this._active._properties.z_size);
                if (z_min < z_max) {
                    fix.z_shift = z_min;
                    fix.z_size = z_max - z_min;
                    this._active._fix(fix);
                    this._blocks.push(this._active);
                    this._active = null;
                } else {
                    fix.x_shift = this._active._properties.x_pos;
                    fix.z_shift = this._active._properties.z_pos;
                    fix.x_size = this._active._properties.x_size;
                    fix.z_size = this._active._properties.z_size;
                    this._active._fix(fix);
                    this._blocks.push(this._active);
                    this._active = null;
                    return false;
                }
            }
            head = this._blocks[this._blocks.length - 1]._properties;
            let crossSeed = head.cross;
            let seed = {
                x_size: fix.x_size,
                z_size: fix.z_size,
                x_shift: fix.x_shift,
                z_shift: fix.z_shift,
                cross: crossSeed == Block.crosses.Z_BASED ? Block.crosses.X_BASED : Block.crosses.Z_BASED,
                height: this._settings.BLOCK_SETTINGS.STANDART_HEIGHT,
                color: this._random_color()
            };
            this._active = new Block(this._ctx, this._gl, this._settings.BLOCK_SETTINGS, Block.types.ACTIVE, seed);
            console.log('Fixed block');
            return true;
        }

        _setupShaderProgram(shaderProgram) {
            this._gl.useProgram(shaderProgram);

            shaderProgram.vertexPositionAttribute = this._gl.getAttribLocation(shaderProgram, 'aVertexPosition');
            this._gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.vertexNormalAttribute = this._gl.getAttribLocation(shaderProgram, "aVertexNormal");
            this._gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

            shaderProgram.vertexColorAttribute = this._gl.getAttribLocation(shaderProgram, 'aVertexColor');
            this._gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

            shaderProgram.pMatrixUniform = this._gl.getUniformLocation(shaderProgram, 'uPMatrix');
            shaderProgram.mvMatrixUniform = this._gl.getUniformLocation(shaderProgram, 'uMVMatrix');
            shaderProgram.nMatrixUniform = this._gl.getUniformLocation(shaderProgram, "uNMatrix");
            shaderProgram.samplerUniform = this._gl.getUniformLocation(shaderProgram, "uSampler");
            shaderProgram.useLightingUniform = this._gl.getUniformLocation(shaderProgram, "uUseLighting");
            shaderProgram.ambientColorUniform = this._gl.getUniformLocation(shaderProgram, "uAmbientColor");
            shaderProgram.lightingDirectionUniform = this._gl.getUniformLocation(shaderProgram, "uLightingDirection");
            shaderProgram.directionalColorUniform = this._gl.getUniformLocation(shaderProgram, "uDirectionalColor");
            return shaderProgram;
        }
    }

    class Game extends IPlayable {
        constructor(ctx, gl, config) {
            super();
            this._cfg = config;
            this._ctx = ctx;
            this._gl = gl;

            this._isStarted = false;
            this._isPaused = false;
            this._isClosed = false;

            this._lastFrame = (new Date()).getTime();
            this._interval = 0;
            this._score = -1;

            this._lastFrameFPS = (new Date()).getTime();
            this._framesCount = 0;
            this._intervalFPS = 25; // in seconds
            this._angle = 0;
            this._background = new Background(ctx, gl);
            this._capture = new Capture(ctx, gl);
            this._starsCollection = new StarsCollection(ctx, gl, this._cfg);
            this._blocksCollection = new BlocksCollection(ctx, gl, this._cfg);

            this._animationID = null;
            this._capture._setCapture('Нажмите на <Enter>, чтобы начать игру. Кнопка <P> ставит игру на паузу. <ESC> для выхода');
            this._drawScene();
            console.log('Game класс создан');
        }

        start() {
            if (this._isStarted) {
                return;
            }
            this._score = 0;
            this._interval = 0;
            this._capture._setCapture(`Ваш счёт - ${this._score}`);
            this._lastFrame = (new Date()).getTime();
            this._blocksCollection._start();
            this._isStarted = true;
            console.log('started');
        }

        pause() {
            if (this._isClosed || !this._isStarted) {
                return;
            }
            if (this._isPaused) {
                this._capture._setCapture(`Ваш счёт - ${this._score}`);
                this._isPaused = false;
                console.log('un paused');
            } else {
                this._capture._setCapture(`Нажмите <P>, чтобы продолжить`);
                this._isPaused = true;
                console.log('paused');
            }
        }

        reset() {
            if (this._isClosed || !this._isStarted) {
                return;
            }
            this._capture._setCapture(`Игра закончена. Ваш результат - ${this._score}`);
            this._isClosed = true;
            console.log('reseted');
        }

        action() {
            if (this._isClosed || this._isPaused || !this._isStarted) {
                return;
            }
            if (this._blocksCollection._fixBlock() === true) {
                this._score++;
                this._capture._setCapture(`Ваш счёт - ${this._score}`);
            } else {
                this.reset();
            }
            console.log('do it!');
        }

        _drawScene() {
            let now = (new Date()).getTime();
            this._framesCount++;
            this._interval = now - this._lastFrame;
            if (now - this._lastFrameFPS > this._intervalFPS * 1000) {
                let FPS = Math.round((this._framesCount * 1000) / (now - this._lastFrameFPS));
                console.log(`FPS = ${FPS}`);
                this._lastFrameFPS = now;
                this._framesCount = 0;
            }
            this._lastFrame = now;

            this._angle += (this._interval / 50);
            this._gl.viewport(0, 0, this._gl.viewportWidth, this._gl.viewportHeight);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

            this._background.animate(this._interval);
            this._starsCollection.animate(this._interval);
            this._blocksCollection.animate(this._interval);
            this._capture.animate(this._interval);
            this._background.draw();
            this._starsCollection.draw();
            this._blocksCollection.draw(this._angle);
            this._capture.draw();

            this._animationID = requestAnimationFrame(this._drawScene.bind(this));
        }

        _destroy() {
            cancelAnimationFrame(this._animationID);
            console.log('Game деконструирован');
        }
    }

    class Shaders {
        constructor(gl) {
            this._gl = gl;
            this._fragmentShader = null;
            this._vertexShader = null;
            this._shaderProgram = null;
            this._stack = [];
        }

        push(elem) {
            let copy = mat4.create();
            mat4.set(elem, copy);
            this._stack.push(copy);
        }

        pop() {
            if (this._stack.length === 0) {
                throw new Error('Стек пустой!');
            }
            return this._stack.pop();
        }

        setMatrixUniforms(pMatrix, mvMatrix) {
            this._gl.uniformMatrix4fv(this._shaderProgram.pMatrixUniform, false, pMatrix);
            this._gl.uniformMatrix4fv(this._shaderProgram.mvMatrixUniform, false, mvMatrix);

            let normalMatrix = mat3.create();
            mat4.toInverseMat3(mvMatrix, normalMatrix);
            mat3.transpose(normalMatrix);
            this._gl.uniformMatrix3fv(this._shaderProgram.nMatrixUniform, false, normalMatrix);
        }

        setFragmentShader(id) {
            let shader = Shaders.loadShaderById(this._gl, id);
            if (!shader) {
                throw new Error(`Не удалось загрузить шейдер ${id}`);
            }
            this._fragmentShader = shader;
        }

        setVertexShader(id) {
            let shader = Shaders.loadShaderById(this._gl, id);
            if (!shader) {
                throw new Error(`Не удалось загрузить шейдер ${id}`);
            }
            this._vertexShader = shader;
        }

        createProgram() {
            let shaderProgram = this._gl.createProgram();
            this._gl.attachShader(shaderProgram, this._vertexShader);
            this._gl.attachShader(shaderProgram, this._fragmentShader);
            this._gl.linkProgram(shaderProgram);

            if (!this._gl.getProgramParameter(shaderProgram, this._gl.LINK_STATUS)) {
                throw new Error('Не удалось связать шейдеры');
            }

            this._shaderProgram = shaderProgram;
            return this._shaderProgram;
        }

        setProgram(program) {
            if (program) {
                this._shaderProgram = program;
            }
        }

        getProgram() {
            return this._shaderProgram;
        }

        static loadShaderById(gl, id) {
            let shaderScript = document.getElementById(id);
            if (!shaderScript) {
                return null;
            }
            let str = "";
            let child = shaderScript.firstChild;
            while (child) {
                if (child.nodeType == 3) {
                    str += child.textContent;
                }
                child = child.nextSibling;
            }
            const shaderTypes = {
                FRAGMENT_SHADER: 'x-shader/x-fragment',
                VERTEX_SHADER: 'x-shader/x-vertex'
            };
            let shader;
            if (shaderScript.type === shaderTypes.FRAGMENT_SHADER) {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (shaderScript.type === shaderTypes.VERTEX_SHADER) {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }
            gl.shaderSource(shader, str);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }
    }

    const GAME_CONFIG = {
        MAX_STARS_COUNT: 150,

        STAR_SETTINGS: {
            MIN_R: 3,
            D_R: 5,
            D_X: 4,
            D_Y: 4,
            //BLINK_R: 2,
            BLINK_PERIOD_MIN: 1500,
            BLINK_PERIOD_D: 5000
        },
        BLOCK_SETTINGS: {
            SIZE: 100,
            DIMENTION_REAL: 400,
            DIMENTION_WEBGL: 0.66,
            COLORS: [
                Color('#A98EC7'),
                Color('#C38EC7'),
                Color('#C78E93'),
                Color('#C7C38E'),
                Color('#C7C38E'),
                Color('#8EC7A9'),
                Color('#8EC2C7'),
                Color('#8EA5C7')],
            HEADER_COLOR: Color('#1560BD'),
            STANDART_DIM: 400,
            STANDART_HEIGHT: 40,
            STANDART_SPEED: 70,
            COMBO_PERCENTAGE: 5,
            AMPLITUDE: 1.2
        }
    };


    return function () {
        const updateSize = function ({canvas2d, canvas3d, ctx, gl}) {
            let realToCSSPixels = window.devicePixelRatio || 1;
            let displayWidth = Math.floor(window.innerWidth * realToCSSPixels);
            let displayHeight = Math.floor(window.innerHeight * realToCSSPixels);
            if (canvas2d.width != displayWidth ||
                canvas2d.height != displayHeight ||
                canvas3d.width != displayWidth ||
                canvas3d.height != displayHeight) {

                canvas2d.width = displayWidth;
                canvas2d.height = displayHeight;
                canvas3d.width = displayWidth;
                canvas3d.height = displayHeight;
                gl.viewport(0, 0, displayWidth, displayHeight);
                gl.viewportWidth = displayWidth;
                gl.viewportHeight = displayHeight;

            }
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        const initWebGL = function (canvas) {
            let obj = null;
            try {
                obj = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            }
            catch (e) {
            }

            if (!obj) {
                alert('Ваш браузер не поддерживает WebGL. Скачайте себе что-нибудь по современнее.');
                obj = null;
            }
            obj.clearColor(0, 0, 0, 0);
            obj.enable(obj.DEPTH_TEST);
            obj.depthFunc(obj.LEQUAL);
            return obj;
        };
        const keyGrabber = function (game, event) {
            const KEYS = {
                'ESC': 27,
                'SPACE': 32,
                'PAUSE': 80,
                'ENTER': 13
            };
            event.preventDefault();
            switch (event.keyCode) {
                case KEYS.ESC:
                    game.reset();
                    break;
                case KEYS.ENTER:
                    game.start();
                    break;
                case KEYS.SPACE:
                    game.action();
                    break;
                case KEYS.PAUSE:
                    game.pause();
                    break;
            }
        };
        const canvas2d = document.getElementById('canvas2d');
        const canvas3d = document.getElementById('canvas3d');
        let ctx = canvas2d.getContext('2d');
        let gl = initWebGL(canvas3d);
        if (!gl) {
            return undefined;
        }
        Block.types();
        Block.crosses();

        window.addEventListener('resize', updateSize.bind(null, {canvas2d, canvas3d, ctx, gl}));
        updateSize({canvas2d, canvas3d, ctx, gl});
        const game = new Game(ctx, gl, GAME_CONFIG);
        window.addEventListener('keydown', keyGrabber.bind(null, game));
    };
})();
