document.getElementById("appRd").addEventListener("change", generateAutoUID)
document.getElementById("device-type-dkp").addEventListener("change", generateAutoUID)
document.getElementById("device-type-app").addEventListener("change", generateAutoUID)
document.getElementById("device-type-mbr").addEventListener("change", generateAutoUID)
document.getElementById("device-type-cwa").addEventListener("change", generateAutoUID)

function generateAutoUID() {
    const uniqueIDInput = document.getElementById("unique-id");
    const campaignNameInput = document.getElementById("campaign-name");
    const versionInput = document.getElementById("version");
    const appRedesignCheckBox = document.getElementById("appRd")
    const deviceTypeDkp = document.getElementById("device-type-dkp")
    const deviceTypeMbr = document.getElementById("device-type-mbr")
    const deviceTypeCwa = document.getElementById("device-type-cwa")
    let campaignName = campaignNameInput.value.replace(/\s/g, "-");

    if (!appRedesignCheckBox.checked || appRedesignCheckBox.checked && deviceTypeDkp.checked || appRedesignCheckBox.checked && deviceTypeMbr.checked || appRedesignCheckBox.checked && deviceTypeCwa.checked) {
        uniqueIDInput.maxLength = 9;
    } else {
        uniqueIDInput.maxLength = 7;
    }

    // Replace "lp" with "l0"
    campaignName = campaignName.replace(/lp/g, "l0");

    // Replace "-" with "0"
    campaignName = campaignName.replace(/-/g, "0");

    campaignName = campaignName.replace(/&/g, "0");

    campaignName = campaignName.split('*').join('0');
    campaignName = campaignName.split('$').join('0');
    campaignName = campaignName.split('%').join('0');
    campaignName = campaignName.split('!').join('0');
    campaignName = campaignName.split('"').join('0');
    campaignName = campaignName.split('^').join('0');
    campaignName = campaignName.split('+').join('0');
    campaignName = campaignName.split('-').join('0');
    campaignName = campaignName.split(')').join('0');
    campaignName = campaignName.split('(').join('0');
    campaignName = campaignName.split('@').join('0');
    campaignName = campaignName.split('#').join('0');
    campaignName = campaignName.split('~').join('0');
    campaignName = campaignName.split('>').join('0');
    campaignName = campaignName.split('<').join('0');

    const version = versionInput.value;

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString().slice(-2);

    if (campaignName.trim().length > 0 && (!appRedesignCheckBox.checked || (appRedesignCheckBox.checked && (deviceTypeDkp.checked || deviceTypeMbr.checked || deviceTypeCwa.checked)))) {
        const campaignPrefix = campaignName.substring(0, 5).padEnd(5, "0");
        uniqueIDInput.value = `${month}${year}${campaignPrefix}`;
    } else if (appRedesignCheckBox.checked) {
        const campaignPrefix = campaignName.substring(0, 3).padEnd(3, "0");
        uniqueIDInput.value = `${month}${year}${campaignPrefix}`;
    } else {
        uniqueIDInput.value = "";
    }
    
}