import * as Yup from 'yup'

export const loginSchema=Yup.object({
    email:Yup.string().email().required("Please enter email")
})
export const signupSchema=Yup.object({
    name:Yup.string().required("Please enter Name").min(1), 
    email:Yup.string().email().required("Please enter email"), 
    password:Yup.string().min(6).required("Enter Password"),
    confirm_password:Yup.string().required().oneOf([Yup.ref("password"),null],"password must match"),

    //if nothing is inserted return true, if something is added check whether it matches or not
    secret: Yup.string().test('secret', 'Secret Code should match', function (value) {
        if(!value) return true
        const expectedString = 'abcd'; 
        return value === expectedString;
      }),
})
