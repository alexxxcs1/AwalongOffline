import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    customer.isLogin = () => {
        return ajaxinstance.post('islogin');
      }
    customer.Login = (uname,upassword) => {
        return ajaxinstance.post('login',qs.stringify({
            uname,upassword
        }));
      }
    return customer
  }

  export default AskPost