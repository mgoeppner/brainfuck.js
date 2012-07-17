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
                //console.log(String.fromCharCode(parseInt(memory[pointer])));
                console.log(memory[pointer]);
                return pointer;
            },
            ',': function (pointer, memory)
            {
                var input = prompt("Enter a character:").charCodeAt(0);
                memory[pointer] = input;
                return pointer;
            },
            '[': function (pointer, memory, inst, program)
            {
                var newInst = 0;
                if (memory[pointer] == 0)
                {
                    // Jump to after ']'
                    newInst = program.indexOf(']', inst) + 1;
                    brainfuck.commands[program[newInst]](pointer, memory, inst, program);
                }
                return pointer;
            },
            ']': function (pointer, memory, inst, program)
            {
                var newInst = 0;
                if (memory[pointer] != 0)
                {
                    // Run Loop Code
                    newInst = program.lastIndexOf('[', inst) + 1;
                    loop = program.slice(newInst, inst);
                    for (char in loop)
                    {
                        if (typeof brainfuck.commands[loop[char]] === 'function')
                            brainfuck.commands[loop[char]](pointer, memory, inst, program);
                    }
                }

                return pointer;
            }
        },
        init: function ()
        {
            return new Array(30001).join(0).split('');
        },
        exec: function (program)
        {
            var memory = this.init();
            var pointer = 0;
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