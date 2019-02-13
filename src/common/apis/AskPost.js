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
    customer.createNewRoom = (roomcode,roomcontent,usercount,isPublic) => {
        return ajaxinstance.post('newroom',qs.stringify({
          roomcode,roomcontent,usercount,isPublic
        }));
      }
    customer.EnterRoom = (roomcode) => {
        return ajaxinstance.post('userenter',qs.stringify({
          roomcode
        }));
    }
      
    return customer
  }

  export default AskPost