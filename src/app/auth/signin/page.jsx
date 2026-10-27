'use client'
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField, InputGroup } from "@heroui/react";
import { useState } from "react";
const SignInPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries())
        console.log("Submitted Form With", userData)

        const { data, error } = await authClient.signIn.email({

            email: userData.email,
            password: userData.password,
            callbackURL: '/'

        })
        if (error) {
            alert("reason sign up error: " + error.message)
        }
        if (data) {
            alert('Sign In Successfully.You have to go to your email to verify your account')
        }

        console.log("Response Form Data", { data, error })
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
                <TextField className="w-96" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-96"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            placeholder="Your Password"
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
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