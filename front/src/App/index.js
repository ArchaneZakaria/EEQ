import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import { AuthContext } from '../helpers/AuthContext';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});
/*
const App =(props)=>{
    const [idUtilisateur, setIdtilisateur] = React.useState({idUtilisateur:0});
    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
      });

    return (
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                    <AuthContext.Provider value={{ utilisateur:idUtilisateur ,setIdtilisateur:setIdtilisateur}}>
                        {menu}

                        <Route path="/" component={AdminLayout} />
                        </AuthContext.Provider>
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Aux>
    );
}*/

    
class App extends Component {
    constructor(props){
        super(props);
        this.state={idUtilisateur:localStorage.getItem("userLogged"),
                    authorized:false

    }
    }
    update=(val)=>{
        this.setState({idUtilisateur:val,authorized:true})
        //alert(JSON.stringify(this.state));
    }
    
    //const [idUtilisateur, setIdtilisateur] = useState({idUtilisateur:0});
    render() {
        
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });
      
            return (
                <AuthContext.Provider value={{ utilisateur:this.state.idUtilisateur ,setIdtilisateur:this.update}}>
                <Aux>
                    <ScrollToTop>
                        <Suspense fallback={<Loader/>}>
                            <Switch>
                            
                                {menu}
                                
                               <Route path="/" component={AdminLayout} />
                               
                            </Switch>
                        </Suspense>
                    </ScrollToTop>
                </Aux>
                </AuthContext.Provider>
            );
        
        
    }
}


export default App;
