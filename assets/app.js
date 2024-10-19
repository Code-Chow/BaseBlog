

const app = Vue.createApp({
    data() {
        return {
            currentPage: 'posts',
            extDta:"",
            blogTitle:blogTitle,
            blogDesc:blogDesc,
            footCenter:footCenter,
            footLat:footLat,
            post:false,
            htmlContent:"",
            actualPost:{},
            data: dataToPosts,
            objPost:{}
        };
    },
    methods: {
        fetchHtml(url){
            console.log("POST")
            console.log(this.actualPost)
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    this.htmlContent = data;
                    this.$nextTick(() => {
                        hljs.highlightAll();
                    });
                })
                .catch(error => {
                    console.error('Error fetching HTML:', error);
                });
        },
        changePage(page) {
            this.currentPage = page;
            let sections = document.querySelectorAll('.botMenu');
            for(let section of sections){
                section.classList.remove('active')
            }
            document.getElementById("menu_"+page).classList.add('active')
        }

    },
    mounted() {
        this.changePage('posts')
    },
    template: `
        <header id="head" class="hiddenOverflow stHeader">
            <section id="headContent" class="container hiddenOverflow layautHead">
                <div class="gridBase gridNav" >
                    <h1 class="title" style="text-align:left">{{ blogTitle }}</h1>
                    <h2 style="color:var(--text-1-color)">{{ blogDesc }}</h2>
                    <figure style="height: 3vh;margin: 1vh;text-align: end;">
                        <img id="img_logo" src="assets/logo.png" alt="Logo del Blog" style="width: 3.5vh;">
                    </figure>
                </div>
            </section>
            <div v-if="post" id="navViewer" class="container layautHead">
                <div class="gridBase gridPost">
                    <div>
                         <a href="index.html" class="botS botM" style="left: 1vh;position: absolute;top: 1vh;">
                            Atras
                        </a>
                    </div>
                    <div>
                    </div>
                    <div style="text-align:center;">
                        <h2 cass="title">{{ objPost.title }}</h2>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                         <div class="botS botM" style="right: 1vh;position: absolute;top: 1vh;">
                            Copiar
                        </div>
                    </div>
                </div>
            </div>
            <nav id="navigatorContent" class="hiddenOverflow layautHead" v-else>
                <ul class="container full" style="padding: 0;">
                    <li class="container full">
                        <div id="menu_home" class="botMenu" @click="changePage('home')">
                            <h1>Home</h1>
                        </div>
                    </li>
                    <li class="container full">
                        <div id="menu_posts" class="botMenu" @click="changePage('posts')">
                            <h1>Scripts</h1>
                        </div>
                    </li>
                    <li class="container full">
                        <div id="menu_contact" class="botMenu" @click="changePage('contact')">
                            <h1>Contact</h1>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
        <main id="content" class="container hiddenOverflow containerSection">
            <article id="contentContent" class="container hiddenOverflow containerSection">
                <section class="hiddenOverflow containerSection" >
                    <div class="containerMargin">
                        <blog-post :content="htmlContent" v-if="post"></blog-post>
                        <component :is="currentPage" v-else></component>
                    </div>
                </section>
            </article>
        </main>
        <phrases></phrases>
         <footer id="foot" class="hiddenOverflow  stHeader">
            <section id="footContent" class="container hiddenOverflow layautHead">
                <div class="gridBase gridNav" >
                    <h1 style="text-align:left"></h1>
                    <h1 class="title"> {{ footCenter }}</h1>
                    <h2 style="text-align:right"> {{ footLat }} </h2>
                </div>
            </section>
        </footer>
    `,

});


