

const app = Vue.createApp({
    data() {
        return {
            currentPage: 'posts',
            extDta:"",
            blogTitle:blogTitle,
            blogDesc:blogDesc,
            footCenter:footCenter,
            footLat:footLat
        };
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
            let sections = document.querySelectorAll('.botMenu');
            for(let section of sections){
                section.classList.remove('active')
            }
            document.getElementById("menu_"+page).classList.add('active')
            //this.update_size()
        },
        loadExtData(url) {
            // const configGet = {
            //     url: url,
            //     method: 'GET',
            //     headers: {
            //         'Access-Control-Allow-Origin': '*'
            //     }
            // };
            //let url = `https://raw.githubusercontent.com/claicode/base_blog/refs/heads/main/assets/terminalTexts.json`;
            axios.get(url)
                .then(response => {
                    // Aquí puedes manejar la respuesta, por ejemplo, almacenar el contenido del documento
                    this.extDta = response.data;
                    //document.getElementById("viewerPost").innerHTML = this.extDta
                    console.log('Contenido del documento:', this.extDta);
                })
                .catch(error => {
                    console.error('Error al cargar el documento:', error);
                });
            return this.extDta
        },

    },
    mounted() {
        //this.loadData()
        this.changePage('posts')
        //document.getElementById('').addEventListener("click",this.loadExtData())
    },
    template: `
        <header id="head" class="hiddenOverflow stHeader">
            <section id="headContent" class="container hiddenOverflow layautHead">
                <div class="gridBase gridNav" >
                    <h1 class="title" style="text-align:left">{{ blogTitle }}</h1>
                    <h2>{{ blogDesc }}</h2>
                    <figure style="height: 3vh;margin: 1vh;text-align: end;">
                        <img id="img_logo" src="assets/logo.png" alt="Logo del Blog" style="width: 3.5vh;">
                    </figure>
                </div>
            </section>
            <nav id="navigatorContent" class="hiddenOverflow layautHead">
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
                        <component :is="currentPage"></component>
                    </div>
                </section>
            </article>
        </main>
        <phrases></phrases>
         <footer id="foot" class="hiddenOverflow  stHeader">
            <section id="footContent" class="container hiddenOverflow layautHead">
                <div class="gridBase gridNav" >
                    <h1 style="text-align:left"></h1>
                    <h1> {{ footCenter }}</h1>
                    <h2 style="text-align:right"> {{ footLat }} </h2>
                </div>
            </section>
        </footer>
    `,

});


