const markup = (function() {

const markupTemplate = `
    <header class="navheader" aria-label="YouSee menu">
    <button class="navheader__button navheader__button--selfcare" data-nav-id="nav-selfcare" aria-hidden="true">Mit YouSee</button>
    <figure class="navheader__logo">
        <img class="navheader__logo-image" src="https://yousee.dk/yousee_dk/graphics/logo/yousee-logo-header.png" alt="YouSee" />
    </figure>
    <button class="navheader__button navheader__button--main" aria-label="Hovednavigation" data-nav-id="nav-main" aria-hidden="true">Menu</button>
</header>

<nav class="navpanel navpanel--main" id="nav-main">
    <div class="navpanel__head">Menu</div>
    <div class="navpanel__body">
        <div class="navsearch">
            <form method="GET" name="search" class="navsearch__form" action="//yousee.dk/newsearch.aspx?startingsite=i_hjemmet">
                <input name="q" type="search" value="" placeholder="Søg efter godter" />
            </form>
        </div>
        <ul class="navpanel__items navpanel__items--level1">
            <li class="navpanel__item navpanel__item--search">

            </li>
            <li class="navpanel__item">
                <a class="navpanel__item-link" href="#">Om YouSee</a>
            </li>
            <li class="navpanel__item navpanel-item-is-parent">
                <a class="navpanel__item-link" href="#">Produkter</a>
                <ul class="navpanel__items navpanel__items--level2">
                    <li class="navpanel__item-header">
                        <a class="navpanel__item-header-link" href="#">Produkter</a>
                    </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                        <li class="navpanel__item">
                            <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                        </li>
                </ul>
            </li>
            <li class="navpanel__item navpanel-item-is-parent">
                <a class="navpanel__item-link" href="#">Hjælp</a>
                <ul class="navpanel__items navpanel__items--level2">
                    <li class="navpanel__item-header">
                        <a class="navpanel__item-header-link" href="#">Hjælp</a>
                    </li>
                    <li class="navpanel__item navpanel-item-is-parent">
                        <a class="navpanel__item-link" href="#">Bredbånd</a>
                        <ul class="navpanel__items navpanel__items--level3">
                            <li class="navpanel__item-header">
                                <a class="navpanel__item-header-link" href="#">Produkter</a>
                            </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                                <li class="navpanel__item">
                                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                                </li>
                        </ul>
                    </li>
                    <li class="navpanel__item">
                        <a class="navpanel__item-link" href="#">Mobil &amp; mobiltbredbånd</a>
                    </li>
                    <li class="navpanel__item">
                        <a class="navpanel__item-link" href="#">Tv</a>
                    </li>
                </ul>
            </li>
            <li class="navpanel__item">
                <a class="navpanel__item-link" href="#">Få Mere Med</a>
            </li>
        </ul>
        <div class="navshortcuts">
            <ul class="navshortcuts-item-wrapper">
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
                    <li class="navshortcuts-item">
                        <a class="navshortcuts-link" href="#">Shortcut link</a>
                    </li>
            </ul>
        </div>
    </div>
</nav>

<nav class="navpanel navpanel--selfcare" id="nav-selfcare">
    <div class="navpanel__head">Mit YouSee</div>
    <div class="navpanel__body">
        <ul class="navpanel__items">
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
                <li class="navpanel__item">
                    <a class="navpanel__item-link" href="#">Lorem ipsum</a>
                </li>
        </ul>
    </div>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', markupTemplate);
})();
 
module.exports = markup;
