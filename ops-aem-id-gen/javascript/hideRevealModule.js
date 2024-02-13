const mainForm = document.getElementById('form-container');
const showHideButton = document.getElementById('show-hide');
const showLiveChecks = document.getElementById('live-check');
const liveCheckButton = document.getElementById('id-publish-check');
const checkId2CheckBox = document.getElementById('checkId2');
const whatsNewButton = document.getElementById('whats-new-button');
const whatsNewContainer = document.getElementById('whats-new');
const devNotesButton = document.getElementById('dev-notes-button');
const devNotesContainer = document.getElementById('dev-notes');
const activitNnameBuilderFormContainer = document.getElementById('activity-name-builder-form-container')
const activityNameBuilderFormButton = document.getElementById('activityNameBuilderFormButton')



const getComputedStyle = (element) => window.getComputedStyle(element);

const hideForm = (form) => form.style.display = 'none';
const showForm = (form) => form.style.display = 'Flex';

const ToggleShowHide = (element, elementStyle) => {
    if (elementStyle.display === 'flex') {
        return hideForm(element);
    } else {
        return showForm(element);
    }
};

showHideButton.addEventListener('change', () => ToggleShowHide(mainForm, getComputedStyle(mainForm))); 
checkId2CheckBox.addEventListener('change', () => ToggleShowHide(showLiveChecks, getComputedStyle(showLiveChecks)));
whatsNewButton.addEventListener('change', () => ToggleShowHide(whatsNewContainer, getComputedStyle(whatsNewContainer)));
devNotesButton.addEventListener('change', () => ToggleShowHide(devNotesContainer, getComputedStyle(devNotesContainer)));
activityNameBuilderFormButton.addEventListener('change', () => ToggleShowHide(activitNnameBuilderFormContainer, getComputedStyle(activitNnameBuilderFormContainer)));