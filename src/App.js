import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks"
// import { LoginOutlined } from "@mui/icons-material";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/Checkout">
            <Checkout/>
          </Route>
          <Route path="/Thanks">
            <Thanks/>
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
