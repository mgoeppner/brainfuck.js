var brainfuck = function()
{
    return {
        exec : function(program)
        {
            var memory = new Int8Array(new ArrayBuffer(30000));
            var pointer = 0;
            
            for (var char = 0; char < program.length; char++)
            {
                switch (program[char])
                {
                    case ">":
                        pointer++;
                        break;
                    case "<":
                        pointer--;
                        break;
                    case "+":
                        memory[pointer]++;
                        break;
                    case "-":
                        memory[pointer]--;
                        break;
                    case ".":
                        console.log(String.fromCharCode(memory[pointer]));
                        break;
                    case ",":
                        var input = prompt("Enter a character:").charCodeAt(0);
                        memory[pointer] = input;
                        break;
                    case "[":
                        if (memory[pointer] == 0)
                        {
                            var matched = 1;
                            var forward = 1;
                            var closeChar = 0;
                            while (matched != 0)
                            {
                                if (program[char + forward] === '[')
                                    matched++;
        
                                else if (program[char + forward] === ']')
                                    matched--;
        
                                if (matched === 0)
                                    closeChar = char + forward;
                                else
                                    forward++;
                            }
                            char = program.indexOf(']', closeChar);
                        }
                        break;
                    case "]":
                        if (memory[pointer] != 0)
                        {
                            var matched = 1;
                            var forward = 1;
                            var closeChar = 0;
        
                            while (matched != 0)
                            {
                                if (program[char - forward] === ']')
                                    matched++;
        
                                else if (program[char - forward] === '[')
                                    matched--;
        
                                if (matched === 0)
                                    closeChar = char - forward;
                                else
                                    forward++;
                            }
                            char = program.lastIndexOf('[', closeChar);
                        }  
                        break;
                }
            }
        }
    }    
}();