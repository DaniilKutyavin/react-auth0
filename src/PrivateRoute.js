import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        // Redirect to login if not logged in
        if (!auth.isAuthenticated()) return auth.login();

        // Display message if user lacks requires scope(s)
        if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
          return (
            <h1>
              Unauthorized - You need the following scope(s) to view this page:{" "}
              {scopes.join()}
            </h1>
          );
        }

        return <Component auth={auth} {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
  scopes: []
};

export default PrivateRoute;
