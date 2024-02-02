function generateAutoUID() {
    const uniqueIDInput = document.getElementById("unique-id");
    const campaignNameInput = document.getElementById("campaign-name");
    const versionInput = document.getElementById("version");

    let campaignName = campaignNameInput.value.replace(/\s/g, "-");

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

    if (campaignName.trim().length > 0) {
        const campaignPrefix = campaignName.substring(0, 5).padEnd(5, "0");
        uniqueIDInput.value = `${month}${year}${campaignPrefix}`;
    } else {
        uniqueIDInput.value = "";
    }
}