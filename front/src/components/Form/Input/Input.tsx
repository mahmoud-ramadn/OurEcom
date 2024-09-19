import { Form, FormText } from "react-bootstrap"
import { Path, FieldValues, UseFormRegister } from "react-hook-form";




type InputProps<TFieldValue extends FieldValues> = {
    label: string;
    name: Path<TFieldValue>;
    type?: string;
    register: UseFormRegister<TFieldValue>;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string;
    success: string;
    disabled: boolean;

}
const Input = ({ label, name, type, register, error, onBlur,
    formText, success, disabled
}: InputProps<FieldValues>) => {

    const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e)
            register(name).onBlur(e);

        } else {
            register(name).onBlur(e)
        }
    }

    return (
        <Form.Group className="mb-3" >
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}

                 {...register(name)}
            
                

                onBlur={onblurHandler}

                isValid={success ? true : false}
                isInvalid={error ? true : false}
                disabled={disabled}


            />



            <Form.Control.Feedback type="invalid" >{error}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid" >{success}</Form.Control.Feedback>
            {formText && <FormText muted>{formText}</FormText>}
        </Form.Group>

    )
}

export default Input