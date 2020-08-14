**JetBlue Component Library**

The JetBlue Component Library uses **Tachyons** to help build our application. You can access the docs from the Tachyons website at http://tachyons.io/ or access the offical Github Repository at https://github.com/tachyons-css/tachyons/. Where

Tachyons works with **immutable classes**, meaning that there is a class per each CSS property. This helps promote **code reuse** and reduces the amount of redundancy in the codebase. It also allows **easy maintenance** of components and page layouts in the application. Sometimes Tachyons may not have all the classes we need. In those cases we can create our own utility classes using the Tachyons naming convention.

_For example:_

**CSS**

> .f3 { font-size: 1rem; }

> .mt3 { margin-top: 1rem }

**HTML**

> <p class=“f3 mt3”>My title</p>

**What to Include**
All styles added to the global stylesheet - i.e., anything within this folder - should be considered part of the public API. If you aren't sure if you want to expose a given class, it might be better off closer to its component.
