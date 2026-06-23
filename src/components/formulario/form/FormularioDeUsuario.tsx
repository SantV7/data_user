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
    const [ secondName, setSecondName ] = git PushManageruseState<string>("")
    const [ passwordUser, setPasswordUser ] = useState<string | number>("")
    const [ birthday, setBirthday ] = useState<string>("")
    const [ countryUser, setCountryUser ] = useState<string>("")
    const [ showMoreCountry, setShowMoreCountry ] = useState<boolean>(false)
    const [ customCountry, setCustomCountry ] = useState<string>("")

    const {dataFetch, isLoading, error, fetchPost} = useFetch(urlDatase)
    
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      setCountryUser(selectedValue);
      setShowMoreCountry(selectedValue === "Outros");
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()

        
        const finallyCountry = countryUser === "Outros" ? customCountry : countryUser;

        const dataUpdatedUser: UserDataProps = {
          firstName,
          secondName,
          passwordUser,
          birthday,
          country: finallyCountry
        }

        useEffect(() => {
          if(dataFetch) {
            setUserData(dataFetch)
          }
        }, [urlDatase])

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

      <div>
        <label htmlFor="aniversario">
          <span>Data de Nascimento</span>
          <input 
            required
            type="date" 
            id="aniversario" 
            name="29/08/2007" 
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
      </div>

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

      <div>
        <button type="submit">Enviar</button>
        <button >Apagar tudo</button>
      </div>
    </form>
  );
};

export default FormularioDeUsuario;