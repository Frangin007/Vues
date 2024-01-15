<template>
    <div class="wrapper">
        <div class="container">
            <header>
                <div class="left-side">
                    <div class="logo-container">
                        <img src="http://admin.takafamindset.com/takafa_backend/storage/main/Takafamindset.svg" alt="Takafa Mindset"/>
                    </div>
                </div>
                <div class="right-side">
                    <div class="btn-ctn">
                        <a href="#">
                            Join Us
                        </a>
                    </div>
                    <div class="btn-ctn">
                        <a href="#">
                            Go to Website
                        </a>
                    </div>
                </div>
            </header>
            <router-view />
            <footer>
                <div>
                    <ul>
                        <li><a href="#">Academy</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><a href="#"><brandFacebook-icon/></a></li>
                        <li><a href="#"><brandInstagram-icon/></a></li>
                        <li><a href="#"><brandLinkedin-icon/></a></li>
                        <li><a href="#"><brandYoutube-icon/></a></li>
                    </ul>
                </div>
                <div>
                    <p>
                        Copyright <copyright-icon/> {{(new Date()).getFullYear()}}
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>

export default {
    name : 'dashboardAuth',
    setup() {
        //console.log("okay")
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/app.scss';
    .wrapper {
        position: relative;
		min-height: 100vh;
		width  : 100vw;
        .container {
            padding: 0px 0px 20px 0px;

            header {
                //outline: 1px solid black;
                position: relative;
                box-sizing: border-box;
                padding: 10px 20px;
                //display : flex;
                //justify-content: space-between;
                //background-color: transparent;
                box-shadow : 0px 20px 27px rgb(0 0 0 / 5%);
                .left-side {
                    //float : left;
                    //outline: 1px solid green;
                    .logo-container {
                        max-width: 250px;
                        //outline: 1px solid purple;
                        //box-shadow: 24px 16px 64px 0 rgba(0, 0, 0, 0.08);

                        img {
                            position: relative;
                            max-width: 80%;
                        }
                    }
                }
                .right-side {
                    //float : right;
                    top : 50%;
                    right : 50px;
                    transform: translateY(-50%);
                    position : absolute;
                    //outline: 1px solid green;
                    display : flex;
                    justify-content: space-between;
                    align-items: center;
                    & .btn-ctn {
                        & a {
                            @extend %btn-primary;
                            text-decoration: none;
                            display: inline-block;
                        }
                        &:last-child {
                            margin-left: 20px;
                        }
                    }

                }
            }

            footer {
                position: relative;
                box-sizing: border-box;
                padding: 10px 20px;
                & > div {
                    width : 40%;
                    margin:  10px auto;
                    padding : 5px 15px;
                    font-size: $f-small;
                    & ul {
                        padding-inline-start: 0;
                        display : flex;
                        justify-content: space-evenly;
                        align-items: center;
                        
                        & li {
                            //outline: 1px solid red;
                            a {
                                text-decoration: none;
                                color: $color-gray-7;
                                font-size: 1.2em;
                                transition: color .2s ease-out;
                                & svg {
                                    @include svg-icon($size : 18px, $stroke:2);
                                    color: inherit;
                                }
                                &:hover {
                                    color: $color-primary;
                                }
                            }
                        }
                    }
                    &:nth-child(2) {
                        width: 30%;
                    }

                    & p {
                        color: $color-gray-7;
                        display : flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.3em;
                        & svg {
                            @include svg-icon($size : 18px, $stroke:2);
                            color: inherit;
                            margin: 0 2px;
                        }
                    }
                }
            }
        }
    }
</style>