import React from "react";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Clearfix from "material-kit-react/components/Clearfix/Clearfix";

// SnackbarContent.propTypes = {
//    message: PropTypes.node.isRequired,
//    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
//    close: PropTypes.bool,
//    icon: PropTypes.func
// };

class Notifications extends React.Component {

   render() {
      return (
         <div>
            <SnackbarContent
               message={
                  <span>
                <b>INFO ALERT:</b> You've got some friends nearby, stop looking
                at your phone and find them...
              </span>
               }
               close="true"
               default="info"
            />
            <SnackbarContent
               message={
                  <span>
              <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
               }
               close="true"
               default="success"
            />
            <SnackbarContent
               message={
                  <span>
              <b>WARNING ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
               }
               close="true"
               default="warning"
            />
            <SnackbarContent
               message={
                  <span>
              <b>DANGER ALERT:</b> You've got some friends nearby, stop looking
              at your phone and find them...
            </span>
               }
               close="true"
               default="danger"
            />
            <Clearfix />
         </div>
      );
   }
}

export default Notifications;


