import { z, ZodIssue } from "zod";
import { useZorm } from "react-zorm";
import useAxios from "axios-hooks";
import { userSchema, UserSchema } from "../schemas/userSchema";
import {MdHourglassBottom, MdHourglassTop} from "react-icons/md"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function LoadingIndicator() {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTop(!top), 500);
    return () => clearTimeout(timeoutId);
  }, [top]);

  return top ? (
    <MdHourglassTop size="16px" color="#2139e0" />
  ) : (
    <MdHourglassBottom size="16px" color="#2139e0" />
  );
}

const texts = {
  title: "Criar conta",
  submit: "Enviar",
  passwordMatchError: "As senhas são diferentes",
  submitSuccess: "Conta criada com sucesso",
  submitFailure: "Houve um erro ao criar sua conta",
};

const signupSchema = userSchema
  .extend({
    confirmPassword: z.string().min(0),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: texts.passwordMatchError,
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const router = useRouter();
  const [{data, loading}, execute] = useAxios<{ user: { id: number }; errors: ZodIssue[] }, UserSchema>(
    {
      url: "/api/signup",
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const { ref, fields, errors, validation } = useZorm("signup", signupSchema, {
    customIssues: data?.errors,
    async onValidSubmit(event) {
      event.preventDefault();
      const { data } = await execute({
        data: event.data,
      });
      if (data.user) {
        toast(texts.submitSuccess, {
          closeButton: false,
          hideProgressBar: true,
          position: "bottom-center",
          style: {
            backgroundColor: "#009712",
            color: "#f9f9f9",
          },
        });
        router.push("/");
      } else {
        toast(texts.submitFailure, {
          closeButton: false,
          hideProgressBar: true,
          position: "bottom-center",
          style: {
            backgroundColor: "#f11212",
            color: "#f9f9f9",
          },
        });
      }
    },
  });

  const disabled = validation?.success === false || loading;

  return (
    <form noValidate className="signup-form" ref={ref}>
      <h1 className="signup-title">{texts.title}</h1>
      <input
        type="text"
        placeholder="Nome"
        className={`signup-field ${errors.name("error")}`}
        name={fields.name()}
        disabled={loading}
      />
      {errors.name((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <input
        type="text"
        placeholder="Sobrenome"
        className={`signup-field ${errors.surname("error")}`}
        name={fields.surname()}
        disabled={loading}
      />
      {errors.surname((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <input
        type="email"
        placeholder="Email"
        className={`signup-field ${errors.email("error")}`}
        name={fields.email()}
        disabled={loading}
      />
      {errors.email((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <input
        type="password"
        placeholder="Senha"
        className={`signup-field ${errors.password("error")}`}
        name={fields.password()}
        disabled={loading}
      />
      {errors.password((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <input
        type="password"
        placeholder="Confirmar senha"
        className={`signup-field ${errors.confirmPassword("error")}`}
        name={fields.confirmPassword()}
        disabled={loading}
      />
      {errors.confirmPassword((error) => (
        <ErrorMessage message={error.message} />
      ))}
      <button disabled={disabled} type="submit" className="signup-submit">
        {loading ? <LoadingIndicator /> : texts.submit}
      </button>
      <style jsx>{`
        .signup-form {
          max-width: 600px;
          background-color: rgb(241,210,16);
          border-radius: 4px;
          border: solid 1px #ccc;
          margin: auto;
          margin-top: 64px;
          padding: 16px;
        }
        .signup-title {
          text-align: center;
          margin-bottom: 16px;
        }
        .signup-field {
          width: 100%;
          display: block;
          margin-top: 6px;
          padding: 8px 16px;
          border-radius: 4px;
          border: solid 1px #000;
          box-sizing: border-box;
        }
        .error {
          border-color: #f11212;
        }
        .signup-submit {
          width: 100%;
          margin-top: 6px;
          background-color: transparent;
          border-radius: 12px;
          border: solid 1px #000;
          color: #000;
          font-weight: 600;
          padding: 8px 16px;
          box-sizing: border-box;
          text-transform: uppercase;
        }
        .signup-submit:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .signup-field:disabled {
          border-color: #ccc;
        }
        
        .signup-submit:disabled {
          background-color: rgba(0, 0, 0, 0.05);
          color: #ccc;
          border-color: #ccc;
        }
      `}</style>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <span className="error">
      {message}
      <style jsx>{`
        .error {
          color: #f11212;
          font-size: 10px;
        }
      `}</style>
    </span>
  );
}