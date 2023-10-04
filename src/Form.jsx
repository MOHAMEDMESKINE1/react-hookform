import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
const Form = () => {


    const shema = yup.object({
        fullname:yup.string().required('invalid fullname'),
        age:yup.number().min(18,'too short ').max(90,'too long').required(),
        email:yup.string().email().required(),
        password:yup.string().test('value','invalid password',value=>{
          
            return value ==="123457" 
        }).required(),

    })

    const {register,control,handleSubmit,formState,dirtyFields} = useForm({
        mode:'onBlur',
        resolver:yupResolver(shema),
        defaultValues: async()=>{
           
            const response  = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const user  =await response.json();
          
            return {
                fullname: user.name,
                email: user.email,
                age: 30,
                password: ''
           
            }
            
        }
    });

    const {errors,isSubmitted,isValid,isDirty,isLoading,isSubmitSuccessful,submitCount } = formState;

    const submitForm = (data) => {
        console.log(data)
    }
    return ( 

        <div className="container m-5 md:w-1/2 mx-auto">

            {submitCount>3 ? <div class="flex items-center my-25 p-4 mb-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span class="sr-only">Danger </span>
                                    <div>
                                        <span class="font-medium">Danger alert!</span> You are blocked contact the adminstrator !.
                                    </div>
                                </div>:
                        <>
                        
                        {isLoading && <span>Loading ....</span>}
                        {/* is form submitted */}
                        {/* isSubmitted && isValid */}
                        {(isSubmitSuccessful ) &&  <div class="p-4 mb-4 text-sm text-green-800 shadow-md  font-semibold broder  border-green-500 dark:text-green-400" role="alert"><span class="font-medium mx-2">Success !</span>User has been created successfully</div>}




                        
                        <div className="border border-gray-400 shadow-lg m-5 p-5">
                            
                            <h1 className="text-red-900 font-semibold text-2xl mb-5">Create User  </h1>
                            
                            <form onSubmit={handleSubmit(submitForm)}>

                                    {/* fullname */}
                                    <div className="mb-6 ">
                                        <label forHtml="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Your fullname</label>
                                        <input type="text" id="fullname" {...register('fullname',{
                                            // required:true,
                                            // minLength:{
                                            //     value:5,
                                            //     message:'too manu chars'
                                            // }
                                        })} className="shadow-sm bg-gray-50 border border-gray-300  text-sm  focus:ring-blue-500 focus:border-gray-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-gray-100 dark:shadow-sm-light" placeholder="" />
                                        
                                        {errors.fullname && <span className="text-red-400">{errors.fullname.message}</span>}

                                    </div>

                                    {/* age */}
                                    <div className="mb-6">
                                        <label forHtml="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Your age</label>
                                        <input type="text" id="age" {...register('age',{
                                            // required:true,
                                            // min:18,
                                            // max:90
                                        })} className="shadow-sm bg-gray-50 border border-gray-300  text-sm  focus:ring-blue-500 focus:border-gray-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-gray-100 dark:shadow-sm-light" />
                                        {errors.age && <span className="text-red-400">{errors.age.message}</span>}
                                    </div>

                                    {/* email */}
                                    <div className="mb-6">
                                        <label forHtml="repeat-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Your email</label>
                                        <input type="email" {...register('email',{
                                            // pattern:{
                                            //     value:/^\S+@\S+\.\S+$/,
                                            //     message:'invalid email'
                                            // }
                                        })} id="repeat-email" className="shadow-sm bg-gray-50 border border-gray-300  text-sm  focus:ring-blue-500 focus:border-gray-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-gray-100 dark:shadow-sm-light" />
                                        {errors.email && <span className="text-red-400">{errors.email.message}</span>}

                                    </div>
                                    
                                    {/* password */}
                                    <div className="mb-6">
                                        <label forHtml="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Your password</label>
                                        <input type="password" {...register('password')} id="repeat-email" className="shadow-sm bg-gray-50 border border-gray-300  text-sm  focus:ring-blue-500 focus:border-gray-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-gray-100 dark:shadow-sm-light" />
                                    </div>
                                    {errors.password && <span className="text-red-400">{errors.password.message}</span>}
                                    
                                    
                                    {/* country */}
                                    <div className="mb-6">

                                        <label forHtml="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                        <select id="country" {...register('country')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Choose a country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                        </select>
                                        {errors.country && <span className="text-red-400">{errors.country.message}</span>}
                                    </div>
                                    {/* terms */}
                                    <div className="flex items-start mb-6">
                                        <div className="flex items-center h-5">
                                        <input id="terms" type="checkbox" {...register('terms')}  value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                        </div>
                                        <label forHtml="terms" className="ml-2 text-sm font-medium text-gray-/900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                                        {errors.terms && <span className="text-red-400">{errors.terms.message}</span>}

                                    </div> 
                                    {/* solution 1 for disabling a button if form not submitted or valid */}
                                    <input disabled={!(isValid && isDirty)} type="submit" className={isDirty && isValid ? "text-white w-full hover:cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " : "text-white w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  cursor-not-allowed "} value="Submit"/>
                                    
                                    {/* solution 2 for disabling a button if form not submitted or valid */}
                                    {/* <input disabled={!isValid || Object.keys(dirtyFields).length===0}  className={'text-white w-full hover:cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '} type="submit" value="Submit"/> */}
                                
                                    </form>
                                
                                    </div>

                                    </>
                            
                        
                                    
                       }
      
            {/* DevTool */}
            <DevTool control={control}/>
    </div>
    
    );
}
 
export default Form;