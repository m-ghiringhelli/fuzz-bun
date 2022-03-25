import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        const famDiv = document.createElement('div');
        const h3 = document.createElement('h3');
        const bunDiv = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunDiv.classList.add('bunnies');
        famDiv.classList.add('family');
        // put the family name in the name element
        h3.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            //    make an element with the css class 'bunny', and put the bunny's name in the text content
            const bun = document.createElement('p');
            bun.classList.add('bunny');
            bun.textContent = bunny.name;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bun.addEventListener('click', async () => {
                await deleteBunny(bunny.name);
                displayFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunDiv.append(bun);
        }
        
        // append the bunniesEl and nameEl to the familyEl
        famDiv.append(h3, bunDiv);
        
        // append the familyEl to the familiesEl
        familiesEl.append(famDiv);
    }
}

window.addEventListener('load', async () => {
    const families = await getFamilies();
    displayFamilies(families);
});
