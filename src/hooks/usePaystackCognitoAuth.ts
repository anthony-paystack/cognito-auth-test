import {  useCognitoAuth } from '../paystack-cognito';

function usePaystackCognitoAuth() {
    return useCognitoAuth({
        userPoolId: 'us-east-2_krpdK7KXX',
        clientId: '1jqh558kjpqkvlemp5vf8so1uh',
        userPoolDomain: 'https://mydummypaystack.auth.us-east-2.amazoncognito.com',
        redirectURI: 'http://localhost:3000/post_auth',
        logoutURI: 'http://localhost:3000/login'
    })
}

export default usePaystackCognitoAuth