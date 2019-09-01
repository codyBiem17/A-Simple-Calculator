function calculator (){
    const onBtn = document.querySelector('.clear-all');
    const screen = document.querySelector('#screen');
    const keys = document.querySelectorAll('.keys');
    const dot = document.querySelector('#dot');
    
  
    const onCalc = onBtn.addEventListener('click',function(){
        screen.value = 0;
    });

    for(let i = 0; i < keys.length; i++){
        keys[i].addEventListener('click', function(){
            if (screen.value == '') {
                alert('Please press the ON button'); 
            }
            else 
            {
                if (this.classList.contains('operands')) {
                    if (this.value == '00' && screen.value !== '0') {
                        screen.value += this.value;
                    }
                    // using ternary operator to check if first digit on screen is zero or not
                    else if (this.value !== '00'){
                        screen.value = screen.value == '0' ? parseFloat(this.value) : screen.value += parseFloat(this.value);
                    }
                      
                }
                else if (this.classList.contains('operators')) {
            
                        screen.value += this.value;  
                }
                
                else if (this.classList.contains('equal-sign')) 
                {
                    let str = screen.value;
                    let extr = /\d+([+-/x]+)\d+/;
                    let op = str.match(/[+-/x%]/g);
                    if (extr.test(str)) {
                        let firstVal = str.slice(0, str.indexOf(op));
                        let secondVal = str.slice(str.indexOf(op)+1,);
                        // console.log(eval(parseFloat(str)));
                        if (str.match('x')) {
                            screen.value = eval(parseFloat(firstVal)  * parseFloat(secondVal));
                        }
                        else{
                            screen.value = eval(parseFloat(firstVal)  + op + parseFloat(secondVal));
                        }
                    }
                }

                // clear last entry with CE
                else if (this.classList.contains('clear')) {
                    let entry = screen.value;
                    screen.value = entry.slice(0,entry.length-1);
                }

                dot.addEventListener('click',function(){
                    if (screen.value.indexOf('.') == -1){
                        screen.value += dot.value;
                    } 
                });
            }  

        });
    }
    
    

    

    let t;
    document.onmousedown = timeout;  // works for touchscreen presses as well      
    document.ontouchstart = timeout; // works for touchscreen swipes as well 
    document.onclick = timeout;      // works for touchpad clicks as well
    document.onkeypress = timeout;   
    
    function noKeyPress() {
        screen.value = '';
    }
    function timeout() {
        offCalculator();
        t = setTimeout(noKeyPress, 30000);  // time is in milliseconds = 3secs
    }
    function offCalculator(){
        clearTimeout(t);
    }
}
calculator();


