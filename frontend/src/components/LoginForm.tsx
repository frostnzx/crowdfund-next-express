"use client";
import React, { useState } from "react";
import Input from "@mui/material/Input";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
    InputLabel,
} from "@mui/material";
import Link from "next/link";
import axios from "@/config/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateCredentials } from "@/redux/slices/authSlice";
import { WidthWideOutlined } from "@mui/icons-material";
import {useRouter} from "next/navigation";

interface userCredentials {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [credentials, setCredentials] = useState<userCredentials>({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value ?? "",
        });
    };
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(credentials.email + " " + credentials.password);
        const response: any = await axios.post(
            `/api/v1/auth/signin`,
            credentials
        );
        const { accessToken } = response.data;
        dispatch(updateCredentials(accessToken)); // Ensure setCredentials returns an action object
        router.push("/");
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Container maxWidth="xs">
                    <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                        <Avatar
                            sx={{
                                mx: "auto",
                                textAlign: "center",
                                mb: 1,
                            }}
                        ></Avatar>
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ textAlign: "center" }}
                        >
                            Sign In
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                placeholder="Enter email"
                                fullWidth
                                required
                                autoFocus
                                sx={{ mb: 2 }}
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <TextField
                                placeholder="Enter password"
                                fullWidth
                                required
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            sx={{ mt: 1 }}
                        >
                            <Grid>
                                <Link href="">Forgot password?</Link>
                            </Grid>
                            <Grid>
                                <Link href="">Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
        </>
    );
}
