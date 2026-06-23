import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useFormValidation } from "../../hooks/useValidatioFormHook";

interface UserDataProps {
  firstName: string;
  secondName: string;
  passwordUser: string;
  birthday: string;
  country: string;
}

const FormularioDeUsuario = () => {
  const urlDatase: string = "http://localhost/aivy/users";


  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [countryUser, setCountryUser] = useState<string>("");
  const [showMoreCountry, setShowMoreCountry] = useState<boolean>(false);
  const [customCountry, setCustomCountry] = useState<string>("");

  const { isLoading, error, fetchPost } = useFetch(urlDatase);


  const {
    validationForm,
    containerName,
    containerPassword,
    containerBirthday,
    containerCountry,
  } = useFormValidation();
    
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCountryUser(selectedValue);
    setShowMoreCountry(selectedValue === "Outros");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const isValid = validationForm({
      firstName,
      secondName,
      passwordUser,
      birthday,
      countryUser,
      customCountry,
    });

    if (!isValid) {
      return;
    }
    
    const finallyCountry = countryUser === "Outros" ? customCountry : countryUser;

    const dataUpdatedUser: UserDataProps = {
      firstName,
      secondName,
      passwordUser,
      birthday,
      country: finallyCountry
    };        

    await fetchPost(dataUpdatedUser);

    // Reset dos campos após o envio com sucesso
    setFirstName("");
    setSecondName("");
    setPasswordUser("");
    setBirthday("");
    setCountryUser("");
    setCustomCountry("");
    setShowMoreCountry(false);
  };

  const handleResetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    setFirstName("");
    setSecondName("");
    setPasswordUser("");
    setBirthday("");
    setCountryUser("");
    setCustomCountry("");
    setShowMoreCountry(false);
  }; 

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>Erro na requisição: {error}</div>}

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

      {containerName && (
        <div>
          <p>É necessário que o nome e o sobrenome sejam preenchidos.</p>
        </div>
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
            required
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
        </label>
      </div>

      {containerPassword && (
        <div>
          <p>Mínimo 8 caracteres, contendo 1 letra maiúscula e 1 minúscula.</p>
        </div>
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
            <option value="Outros">Outros</option>
          </select>
        </label>

        {showMoreCountry && (
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

    
      {containerCountry && (
        <div>
          <p>Por favor, selecione um país válido ou informe o local.</p>
        </div>
      )}

      {isLoading && (
        <div className="loading_container">
          <p>Carregando...</p>
        </div>
      )}

      <div>
        <button
         className="submit_btn"
         type="submit">
           Enviar
        </button>
        
        <button
         onClick={handleResetForm}
         className="delete_btn"
         type="button">
           Apagar tudo
        </button>
      </div>
    </form>
  );
};

export default FormularioDeUsuario;