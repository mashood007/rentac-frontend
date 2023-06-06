import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import signinStyle from '@/styles/Signin.module.css'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useMutation, QueryClient, useQueryClient } from 'react-query'
import { login } from '@/api/auth/login'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import useAuthStore from '@/states/authStore'

const inter = Inter({ subsets: ['latin'] })

interface Values {
  email: string;
  password: string;
}

const Signin = () => {
  const router = useRouter()
  const storeAuthToken = useAuthStore((state: any) => state.storeAuthToken)

  const { mutate: loginMutate, isLoading: isLoading } = useMutation('ab', login, {
    onSuccess: (response: any) => {
      const { data } = response
      storeAuthToken(data?.accessToken)
      router.push('dashboard')
    },
  })
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <div className={signinStyle.login_box + ' p-3'}>
          <h1 className="display-6 mb-3">Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}

            onSubmit={async (
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 500);
              // useMutation
              loginMutate(values)

            }}
          >
            <Form>
              <div className="mb-3">
                <Field className="form-control" id="email" name="email" placeholder="email" aria-describedby="usernameHelp" />
              </div>

              <div className="mb-3">
                <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
              </div>

              <button type="submit" className="btn btn-primary">Login</button>
            </Form>
          </Formik>
        </div>
      </main>
    </div>
  )
}

export default Signin
