function addToDisplay(value)
{
    let display=document.getElementById("expressionDisplay");
    let lastChar=display.value.slice(-1);
    if(display.value==="Error")
    {
        clearDisplay();
    }
    if(['+','-','/','*'].includes(lastChar) && ['+','-','/','*'].includes(value))
    {   
        display.value=display.value.slice(0,-1)+value;
    }
    else if(value==='.')
    {
        if(check_decimalExists(display))
        {
            return;
        }
        else
        {
            display.value+=value;
        }
    }
    else
    {
        display.value+=value;
    }
    updateRealTimeResult();
}

function check_decimalExists(display)
{
    for(let i=display.value.length-1; i>=0;i--)
    {
        if(['+','-','*','/'].includes(display.value[i]))
        {
            break;
        }
        if(display.value[i]==='.')
        {
            return true;
        }
    }
    return false;
}

function clearDisplay()
{
    document.getElementById("expressionDisplay").value="";
    document.getElementById("realTimeResultDisplay").value="";
}

function showResult()
{
    let expression = document.getElementById("expressionDisplay");
    let realResult = document.getElementById("realTimeResultDisplay");
    let slice_value=0;
    if(expression.value==="")
    {
        return;
    }
    if(['+','-','/','*'].includes(expression.value.slice(-1)))
    {
        slice_value=-1;
    }
    try
    {
        let result=validate_Result(expression,slice_value);
        if(isNaN(result)|| result===Infinity || result===-Infinity)
        {
            expression.value="Error";
        }
        else
        {
            expression.value=result;
        }
    }  
    catch(error)
    {   
        expression.value="Error";
    }
    realResult.value="";
}

function deleteSingleCharacter()
{
    let current= document.getElementById("expressionDisplay").value;
    document.getElementById("expressionDisplay").value = current.slice(0, -1);
    updateRealTimeResult();
}

function updateRealTimeResult()
{
    const expression=document.getElementById("expressionDisplay");
    const realTimeResult=document.getElementById("realTimeResultDisplay");
    let slice_value=0;
    if(['+','-','/','*'].includes(expression.value.slice(-1)))
    {
        slice_value=-1;
    }
    try
    {
        let result=validate_Result(expression,slice_value);
        if(result===""||isNaN(result)|| result===Infinity || result===-Infinity)
        {
            if(result===Infinity||result===-Infinity)
            {
                realTimeResult.value="Cannot divide by 0";
            }
            else
            {
                realTimeResult.value="";
            }
        }
        else
        {
            realTimeResult.value=result;
        }
    }
    catch
    {
        realTimeResult.value="";
    }
}

function validate_Result(expression,slice_value)
{
    let result=0;
    if(slice_value===0)
    {
        result=eval(expression.value);
    }
    else
    {
        result=eval(expression.value.slice(0,slice_value));
    }
    return result;
}

document.addEventListener("keydown",function(event)
{
    const key= event.key;
    const allowedKeys=['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Enter','Backspace','Delete','Escape'];
    if(allowedKeys.includes(key))
    {
        event.preventDefault();
        if(key==='Enter')
        {
            showResult();
        }
        else if(key==='Backspace')
        {
            deleteSingleCharacter();
        } 
        else if(key==='Delete'|| key==="Escape")
        {
            clearDisplay();
        }
        else
        {
            addToDisplay(key);
        }
    }
})