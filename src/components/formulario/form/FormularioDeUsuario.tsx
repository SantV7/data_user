import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

interface UserDataProps {
  firstName: string;
  secondName: string;
  passwordUser: string | number;
  birthday: string;
  country: string;
}



const FormularioDeUsuario = () => {

  const urlDatase: string  = "http://localhost/aivy/users"

    const [ userData, setUserData ] = useState<null | UserDataProps>(null)

    const [ firstName, setFirstName ] = useState<string>("")
    const [ secondName, setSecondName ] = useState<string>("")
    const [ passwordUser, setPasswordUser ] = useState<string>("")
    const [ birthday, setBirthday ] = useState<string>("")
    const [ countryUser, setCountryUser ] = useState<string>("")
    const [ showMoreCountry, setShowMoreCountry ] = useState<boolean>(false)
    const [ customCountry, setCustomCountry ] = useState<string>("")

    const [ containerName, setContainerName ] = useState<boolean>(false)
    const [ containerPassword, setContainerPassword ] = useState<boolean>(false)
    const [ containerBirthday, setContainerBirthday ] = useState<boolean>(false);

    const { dataFetch, isLoading, error, fetchPost } = useFetch(urlDatase)
    

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      setCountryUser(selectedValue);
      setShowMoreCountry(selectedValue === "Outros");
    };


    const validationForm = () => {
      
      let isValid: boolean = true

      if(firstName.trim() === "" || secondName.trim() === "" ) {
        isValid = false;
        setContainerName(true)
      } 

      setTimeout(() => setContainerName(false), 2360)


      const regexSenha = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if(!regexSenha.test(passwordUser)) {
        setContainerPassword(true)
        isValid = false;
        setTimeout(() => setContainerPassword(false), 2360)
      }


      const regexData = /^\d{2}\/\d{2}\/\d{4}$/
       if (!regexData.test(birthday)) {
          setContainerBirthday(true);
          isValid = false;
          setTimeout(() => setContainerBirthday(false), 3000);
       } else {
          const [dayStr, mounthStr, yearStr] = birthday.split("/");
          const day = parseInt(dayStr, 10);
          const mounth = parseInt(mounthStr, 10);
          const year = parseInt(yearStr, 10);

        const thisYear = new Date().getFullYear()

        if(day < 1 || day > 31 || mounth < 1 || mounth > 12 || year < 1920 || year > thisYear) {
          setContainerBirthday(true)
          isValid = false
          setTimeout(() => setContainerBirthday(false), 2360);
        }
      }
        return isValid;
   }



    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!validationForm()) {
          return;
        }
        
        const finallyCountry = countryUser === "Outros" ? customCountry : countryUser;

        const dataUpdatedUser: UserDataProps = {
          firstName,
          secondName,
          passwordUser,
          birthday,
          country: finallyCountry
        }        

        await fetchPost(dataUpdatedUser)

        setUserData(dataUpdatedUser)
        setFirstName("")
        setSecondName("")
        setPasswordUser("")
        setBirthday("")
        setShowMoreCountry(false)
    };




  return (
    <form onSubmit={handleSubmit}>
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>

      { containerName && (
        <>
         <div>
           <p>É necessário que o nome e o sobrenome sejam preenchidos.</p>
         </div>
        </>
      )}

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
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
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
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
        </label>
      </div>

      { containerPassword && (
        <>
         <div>
           <p>Mínimo 8 caracteres, contendo 1 letra maiúscula e 1 minúscula.</p>
         </div>
        </>
      )}

      <div>
        <label htmlFor="aniversario">
          <span>Data de Nascimento</span>
          <input 
            required
            type="text" 
            id="aniversario" 
            name="birthday"
            maxLength={10}
            placeholder="formato 00/00/0000" 
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
      </div>

      {containerBirthday && (
        <div>
          <p>Data inválida! Use o formato DD/MM/AAAA.</p>
        </div>
      )}

      <div>
        <label htmlFor="pais">
          <span>País</span>
           <select
            onChange={handleCountryChange}
            value={countryUser}
            name="selectCountry"
            required
            id="country"
           >
            <option value="">Selecione um país</option>
            <option value="Canada">Canada</option>
            <option value="Japão">Japão</option>
            <option value="Brasil">Brasil</option>
            <option value="Argentina">Argentina</option>
            <option value="Finlândia">Finlândia</option>
            <option value="Chile">Chile</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Outras">Outros</option>
          </select>
        </label>

            { showMoreCountry && (
              <div style={{ marginTop: "8px" }}>
              <input 
                type="text" 
                placeholder="Digite o lugar"
                required
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
              />
            </div>
            )}
      </div>

      {isLoading && (
        <>
         <div className="loading_container">
           <p>Carregando...</p>
         </div>
        </>
       )
      }

      <div>
        <button className="submit_btn" type="submit">Enviar</button>
        <button className="delete_btn">Apagar tudo</button>
      </div>
    </form>
  );
};

export default FormularioDeUsuario;