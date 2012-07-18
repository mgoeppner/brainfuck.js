var memory = new Int8Array(new ArrayBuffer(30000));
var pointer = 0;
var loopPointer = 0;
var program = "";
var inLoop = 0;

function exec(program)
{
    for (char = 0; char < program.length; char++)
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
                    char = program.indexOf(']', char);
                break;
            case "]":
                if (memory[pointer] != 0)
                    char = program.lastIndexOf('[', char);
                break;
        }
    }
}

exec(program);