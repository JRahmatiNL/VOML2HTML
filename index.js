function UpdateUI()
{
    // Note that you need some basic understanding of regular expressions to understand this code.
    // You can use the interactive tutorial on https://regexone.com/ to quickly learn the basics.
    //
    // In short:
    // - anything between parantheses (e.g. '(' & ')') represents a group
    // - \s stands for space characters
    // - * stands for 0 or more, while + stands for 1 or more 
    // - \w stands for word characters (including alphanumeric words)
    // - \d stands for digit characters
    // - /expression/ followed by optional special chars is a common way to represent regular expressions
    // - https://regex101.com/ can be used for pattern visualisation
    // 
    var myRegex = /\s*CONTROL\s"(.*?)",\s*(\w+),.*?(\d+), (\d+), (\d+), (\d+)/;
    var uiPanel = document.getElementById("UIPanel");
    var text = document.getElementById("codeArea").value;
    var textParts = text.split(/(\r*\n)/g);
    var htmlResult = "";
    for (let index = 0; index < textParts.length; index++) {
        const element = textParts[index];
        /*
        Group1: controls text value
        Group2: controls (serialized) name
        Group3 until 6: x, y & probably width & height coordinates
        */
        var groupValues = myRegex.exec(element);
        if(groupValues != null)
        {
            var controlName = groupValues[2];
            console.log("control detected " + controlName);
            var controlsTextValue = groupValues[1];;
            var controlXPos = groupValues[3];
            var controlYPos = groupValues[4];
            var controlWidth = groupValues[5];
            var controlHeight = groupValues[6];
            var htmlStyleDisplayText = (
                "display:block;" +
                "position: absolute;" +
                "font-size: 8pt;"
            );
            var htmlStylePositionText = (
                "left: " + controlXPos + "px;" +
                "top: " + controlYPos + "px;"
            );
            var htmlStyleSizeText = (
                "width: " + controlWidth + "px;" + 
                "height: " + controlHeight + "px;"
            );
            var controlStyleText = (
                "border-style:solid;background-color:silver;" + 
                htmlStyleDisplayText +
                htmlStylePositionText +
                htmlStyleSizeText
            );
            var descriptionStyleSizeText = (
                "width: auto;" + 
                "height: auto;"
            );
            var descriptionStylePositionText = (
                "left: " + controlXPos + "px;" +
                "top: " + (Number(controlYPos) + Number(controlHeight) - 2) + "px;"
            );
            var controlDescriptionStyleText = (
                "border-style:dotted;background-color:white;" + 
                htmlStyleDisplayText +
                descriptionStylePositionText +
                descriptionStyleSizeText
            );
            htmlResult += (
                '<div id="'+controlName+'" title="'+controlName+'" style="' + controlStyleText + '" />' + controlsTextValue + '</div>'
            );
        }
    }
    console.log("htmlResult: " + htmlResult);
    uiPanel.innerHTML = htmlResult;
}
