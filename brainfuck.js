var brainfuck =
    {
        commands:
        {
            '>': function (pointer)
            {
                return parseInt(pointer) + 1;
            },
            '<': function (pointer)
            {
                return parseInt(pointer) - 1;
            },
            '+': function (pointer, memory)
            {
                memory[pointer] = parseInt(memory[pointer]) + 1;
                return pointer;
            },
            '-': function (pointer, memory)
            {
                memory[pointer] = parseInt(memory[pointer]) - 1;
                return pointer;
            },
            '.': function (pointer, memory)
            {
                //console.log(String.fromCharCode(parseInt(memory[pointer] << 3)));
                console.log((memory[pointer]));
                return pointer;
            },
            ',': function (pointer, memory)
            {
                var input = prompt("Enter a character:").charCodeAt(0);
                memory[pointer] = input;
                return pointer;
            },
            ']': function (pointer, memory, inst, program)
            {
                var newInst = 0;
                var _pointer = pointer;

                if (memory[_pointer] == 0)
                {
                    // Jump to after ']'
                    newInst = program.indexOf(']', inst) + 1;
                    _pointer = brainfuck.commands[program[newInst]](_pointer, memory, inst, program);
                }
                return _pointer;
            },
            '[': function (pointer, memory, inst, program)
            {
                var newInst = 0;
                var _pointer = pointer;

                if (memory[_pointer] != 0)
                {
                    // Run Loop Code
                    newInst = program.lastIndexOf('[', inst) + 1;
                    loop = program.slice(newInst, inst);
                    for (char in loop)
                    {
                        if (typeof brainfuck.commands[loop[char]] === 'function')
                            _pointer = brainfuck.commands[loop[char]](_pointer, memory, inst, program);
                    }
                }
                return _pointer;
            }
        },
        init: function ()
        {
            this.pointer = 0;
            this.memory = new Int8Array(new ArrayBuffer(30000));
        },
        memory: [],
        pointer: 0,
        exec: function (program)
        {
            this.init();
            var memory = this.memory;
            var pointer = this.pointer;
            var loop = "";
            var inLoop = false;
            var loopStack = [];

            for (char in program)
            {
                if (typeof this.commands[program[char]] === 'function')
                    pointer = this.commands[program[char]](pointer, memory, char, program);
            }
        }
    }