import { useForm } from "react-hook-form";
import { useAuth } from "../../../providers/AuthProvider";
import { Button, FormControl, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";


const Login = () => {

    const { login } = useAuth();
    const [showPassword, setShowPassword ] = useState(false);

    const handleClickShowPassword = () => setShowPassword(prev => !prev);

    const {
        handleSubmit,
        register,
        formState: { errors, submitCount, isValid },
    } = useForm({
        defaultValues: {},
    });

    const username = register('username', {
        required: 'Required',
    });
    
    const password = register('password', {
        required: 'Required',
    });


    const onSubmit = (form) => {
        login({ username: form.username, password: form.password })
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="username"
                                helperText={errors.username ? errors.username.message : null}
                                variant="outlined"
                                label="Username"
                                error={!!errors.username}
                                name={username.name}
                                onBlur={username.onBlur}
                                onChange={username.onChange}
                                inputRef={username.ref}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="password"
                                type={showPassword ? "text" : "password"}
                                helperText={errors.password ? errors.password.password : null}
                                variant="outlined"
                                label="Password"
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          edge="end"
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                error={!!errors.password}
                                name={password.name}
                                onBlur={password.onBlur}
                                onChange={password.onChange}
                                inputRef={password.ref}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button type="submit" disabled={submitCount > 0 && !isValid} variant="outlined" color="primary">
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
    </div>
};

export default Login;