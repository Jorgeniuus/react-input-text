import { Component } from "react";
import './style.css'

export class Button extends Component{
    render(){
        const {text, onClickProp, disabledProp} = this.props
        
        return(
            <button 
                className="button"
                onClick={onClickProp}
                disabled={disabledProp}
                > 
                {text}
            </button>
        )
    }
}

// export function Button({text, onClickProp}){
//     return(
//         <button onClick={onClickProp}> 
//             {text}
//         </button>
//     )
// }