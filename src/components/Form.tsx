import { useState } from "react";

const iniitialFormState = {
    name: '',
    email: '',
    phoneNumber:'',
    message:'',
}

function isValidName(name: string) {
    if(name.length < 2){
        return 'O nome precisa ter pelo menos 2 caracteres'
    }

    if(name.length >35) {
        return 'O nome precisa ter no máximo 35 caracteres'
    }

    return null;
}

function isValidEmail(email: string) {
    if(!email.includes('@')){
        return 'Este email é inválido'
    }

    return null;
}

function isValidPhoneNumber(phoneNumber: string) {
    
    if(phoneNumber.length === 0){
        return null;
    }
    
    if(phoneNumber.length < 11){
        return 'O número de telefone é inválido'
    } 

    return null;
}

function isValidMessage(message: string) {
    if(message.length < 8){
        return 'O message precisa ter pelo menos 8 caracteres'
    }

    if(message.length > 300) {
        return 'O message precisa ter no máximo 300 caracteres'
    }

    return null;
}

function ErrorMessage({message} : {message: string | null}){
    if(message === null) {
        return null;
    }

    return  <span className="error">{message}

    <style jsx>{`
     .error {
        color:#cf0e0e;
        font-size:13px;
     }
    
    `}</style>

    </span>;
}

export function Form() {

    const [formState, setFormState] = useState(iniitialFormState);
    const validName = isValidName(formState.name)
    const validEmail = isValidEmail(formState.email)
    const validPhoneNumber = isValidPhoneNumber(formState.phoneNumber)
    const validMessage = isValidMessage(formState.message)
    const isFormValid = validName === null && validEmail  === null && validMessage === null && validPhoneNumber === null;
    return (
        <>
        <div className="form-container">
            <h1 className="form-title">Entrar em contato</h1>
         <form noValidate className="form" method="POST" onSubmit={async(e) => {
            e.preventDefault();
            
            if(isFormValid) {
                const form = new FormData();
                form.append('fullname', formState.name)
                form.append('email', formState.email)
                form.append('phone-number', formState.phoneNumber)
                form.append('message', formState.message)

                await fetch("https://getform.io/f/7e2ad97e-0c12-43c5-82f3-de4ae8e59c9d", {
                    method: 'post',
                    body:form,
                })

                alert("Formulário enviado com sucesso");
                setFormState(iniitialFormState)
            }
         }}>
           <div className="row">
             <div className="error-field-container">
                <input type="text" name="fullname" id="fullname" className="field" placeholder="Nome completo" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}/>
                <ErrorMessage  message={validName}/>
             </div>   
           </div>
           
           <div className="row">
            <div className="error-field-container email">
                <input type="email" name="email" id="email" className="field" placeholder="example@gmail.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}/>
                <ErrorMessage  message={validEmail}/>
            </div>
            <div className="error-field-container phone-number">
                <input type="tel" name="phone-number" id="phone-number" className="field" placeholder="(DDD) 00000-0000" value={formState.phoneNumber} onChange={e => setFormState({...formState,phoneNumber : e.target.value})}/>
                <ErrorMessage  message={validPhoneNumber}/>
            </div>
           </div>

           <div className="row">
            <div className="error-field-container">
                <textarea id="message" className="field" placeholder="Mensagem" value={formState.message} onChange={e => setFormState({...formState,message : e.target.value})}/>
                <ErrorMessage  message={validMessage}/>
            </div>
           </div>
           
            <button className="form-button" type="submit">Enviar</button>
         </form>
        </div>
         <style jsx>{`

            .form-container {
                margin:12px;
            }

            .form{
                display:flex;
                flex-direction:column;
                
            }

            .form-title {
                text-align:center;
                font-size:22px;
                color: rgb(241,210,16);
            }

            .field {
                width:100%;
                border:1px solid #ccc;
                border-radius: 8px;
                padding: 14px 2px;
                border: none;
                box-sizing: border-box;
            }

            .error-field-container {
                width:100%;
            }

            .field:focus {
                outline:none;
            }

            .field:not(:first-child) {
                margin-top:12px;
            }

            .field:invalid {
                border:red;
            }

            textarea{
                resize: none;
            }

            .row:not(:first-child) {
                margin-top:12px;
            }

            .form-button {
                padding: 12px 18px;
                color:rgba(4,4,2,0.9);
                border: none;
                border-radius:4px;
                margin-top:12px;
                background-color: rgba(255,222,0,255);
            }

            .form-button:hover {
             cursor: pointer;
             background-color: rgba(4,4,2,0.9);
             color:rgba(255,222,0,255);
             transition: 0.9s;
            }


            @media(min-width: 900px) {
                .row {
                    display:flex;
                    resize: none;
                }

                .email {
                    margin-right: 15px;
                    flex:3;
                }

                .phone-number{
                    flex:2;
                }

                .field:not(:first-child) {
                margin-top:0;
            }
            }
        `}</style>
        
        </>
   
    )
}