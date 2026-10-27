'use client'
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
const SignInPage = () => {

      const onSubmit = async(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const userData = Object.fromEntries(formData.entries())
            console.log("Submitted Form With", userData)
    
            const{data, error} = await authClient.signIn.email({
                
                email: userData.email,
                password: userData.password,
                callbackURL: '/'
            
            })
            if(error){
                alert("reason sign up error: " + error.message)
            }
            if(data){
                alert('Sign In Successfully.You have to go to your email to verify your account')
            }
    
            console.log("Response Form Data", {data, error})
        };
    return (
        <div>

             {/**Form START */}
                        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            
                            {/**Email Field START */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Email</Label>
                                <Input name="email" placeholder="Enter Your Email" />
                                <FieldError />
                            </TextField>
                            {/**Email Field END */}
            
                                {/**PassWord Field START */}
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                type="password"
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Password</Label>
                                <Input  name="password" placeholder="Enter your password" />
                                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>
                            {/**PassWord Field END */}
            
                            <div className="flex gap-2">
                                <Button type="submit">
                                    <Check />
                                    Submit
                                </Button>
                                <Button type="reset" variant="secondary">
                                    Reset
                                </Button>
                            </div>
                        </Form>
                        {/**Form END */}
            
        </div>
    );
};

export default SignInPage;