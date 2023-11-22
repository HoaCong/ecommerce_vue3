import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
export const loginStore = defineStore("login", {
  state: () => {
    return {
      status: { isLoading: false, isSuccess: false, isFailure: false },
      user: {
        username: JSON.parse(localStorage.getItem("user"))?.username || "",
      },
      one: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  actions: {
    async login(params, router) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:5000/login",
          params
        );
        this.isLoading = false;
        if (response.status === 200) {
          this.isSuccess = true;
          this.user = response.data.user[0];
          localStorage.setItem("user", JSON.stringify(response.data.user[0]));
          router.push("/");
        } else {
          this.isFailure = true;
        }
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại",
          text: "Xảy ra lỗi khi đăng nhập",
        });
      }
    },

    async register(params) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:5000/users",
          params
        );
        this.isLoading = false;
        if (response.status === 200) {
          this.isSuccess = true;
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công",
            text: "Đã sẵn sàng để đăng nhập",
            showConfirmButton: false,
            timer: 1500,
          });
          return true;
        } else {
          this.isFailure = true;
          Swal.fire({
            icon: "error",
            title: "Đăng ký thất bại",
            text: "Kiểm tra lại thông tin đăng ký",
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        }
      } catch (error) {
        console.error("Register error:", error);
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại",
          text: "Xảy ra lỗi khi đăng ký",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
});
