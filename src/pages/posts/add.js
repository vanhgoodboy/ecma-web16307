import axios from "axios";
import { add } from "../../api/posts";
import Header from "../../components/header";

const AdminAddPosts = {
    async render() {
        return `
            <div class="max-w-5xl mx-auto">
                <div id="header">
                    ${Header.render()}
                </div>
            </div>
            <div class="news">
                        <form id="formAddPost">
                        <input type="text" class="border border-black" id="title-post" placeholder="Title Post"/><br />
                        <input type="file" class="border border-black" id="img-post" /> <br />
                        <input type="text" class="border border-black" id="price-post" placeholder="price"/><br />
                        <input type="text" class="border border-black" id="soluong-post" placeholder="Quantity"/><br />
                        <textarea name="" class="border border-black" id="desc-post" cols="30"></textarea> <br />
                        <button class="bg-blue-500 inline-block px-3 py-4">add post</button>
                        </form>
                        <br>
                        <button><a href="/admin/posts">BACK</a></button>
                    </div>
            
        `;
    },
    afterRender() {
        const formAddPost = document.querySelector("#formAddPost");
        const CLOUDINARY_PRESET = "vietanh";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dybqlreqq/image/upload";

        formAddPost.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Lấy giá trị của input file
            const file = document.querySelector("#img-post").files[0];
            // Gắn vào đối tượng formData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);

            // call api cloudinary, để upload ảnh lên
            const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "application/form-data",
                },
            });
            // call API thêm bài viết
            add({
                title: document.querySelector("#title-post").value,
                img: data.url,
                desc: document.querySelector("#desc-post").value,
                price: document.querySelector("#price-post").value,
                soluong: document.querySelector("#soluong-post").value,
            });
        });
    },
};
export default AdminAddPosts;