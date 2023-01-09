import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// import InputLabel from "@material-ui/core/InputLabel";
// import form from "@material-ui/core/form";
// import Select from "@material-ui/core/Select";
// import option from "@material-ui/core/option";

import { transform } from "../api.js";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "70%",
    margin: theme.spacing(1),
  },
}));

export default function StyleSelector(props) {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <label htmlFor="age-native-helper">
        Select a transformer model
      </label>
      <select
        value={props.modelID}
        onChange={(event) => {
          props.setModelID(event.target.value);
          props.setPercentage(1);
          props.setOpen(true);

          const data = {
            image: props.before,
            model_id: event.target.value,
            load_size: props.LOAD_SIZE,
          };

          transform(data)
            .then((response) => {
              console.log("success");
              console.log(response.data);
              props.setAfter(response.data.output);
              props.setPercentage(0);
              props.setOpen(false);
            })
            .catch((response) => {
              console.log(response);
            });
        }}
        inputProps={{
          name: "age",
          id: "age-native-helper",
        }}
      >
        <option value={0}>Hosoda</option>
        <option value={1}>Hayao</option>
        <option value={2}>Shinkai</option>
        <option value={3}>Paprika</option>
      </select>
    </form>
  );
}