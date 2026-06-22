import { useState } from "react";

const FormularioDeUsuario = () => {

    const [ userData, setUserData ] = useState<null | object>(null)

    const [ firstName, setFirstName ] = useState<string | null>(null)
    const [ secondName, setSecondName ] = useState<string | null>(null)
    const [ passwordUser, setPasswordUser ] = useState<string | number | null>(null)
    const [ birthday, setBirthday ] = useState<string | null>(null)
    const [ contryUser, setCountryUser ] = useState<string | null>(null)

    const handleSubmit = (event) => {
        event.preventDefault()





        setFirstName("")
        setSecondName("")
        setPasswordUser("")
        setBirthday("")
        setCountryUser("")
    }


  return (
    <form>
      <div>
        <label htmlFor="nome">
          <span>Primeiro nome</span>
          <input 
            type="text" 
            id="nome" 
            required
            name="nome" 
            placeholder="Digite seu primeiro nome" 
            maxLength={40}
          />
        </label>
      </div>

      <div>
        <label htmlFor="sobrenome">
          <span>Sobrenome</span>
          <input 
            type="text" 
            id="sobrenome" 
            name="sobrenome" 
            placeholder="Digite seu sobrenome" 
            required
            maxLength={20}
          />
        </label>
      </div>

      <div>
        <label htmlFor="senha">
          <span>Senha</span>
          <input 
            type="password" 
            id="senha" 
            name="senha" 
            placeholder="Senha de 8 caracteres" 
            minLength={8}
            required
            maxLength={8}
          />
        </label>
      </div>

      <div>
        <label htmlFor="aniversario">
          <span>Data de Nascimento</span>
          <input 
            required
            type="date" 
            id="aniversario" 
            name="29/08/2007" 
          />
        </label>
      </div>

      <div>
        <label htmlFor="pais">
          <span>País</span>
          <input 
            required
            type="text" 
            id="pais" 
            name="pais" 
            placeholder="Brasil/ Japão / Canada" 
          />
        </label>
      </div>

      <div>
        <button type="submit">Enviar</button>
        <button>Apagar tudo</button>
      </div>
    </form>
  );
};

export default FormularioDeUsuario;