//You'll likely need to import extension_settings, getContext, and loadExtensionSettings from extensions.js
import { doExtrasFetch, extension_settings, getApiUrl, getContext, modules } from "../../../extensions.js";
import { eventSource, event_types, saveSettingsDebounced } from "../../../../script.js";
import { registerSlashCommand } from '../../../slash-commands.js'

// Keep track of where your extension is located, name should match repo name
const extensionName = "sin-tiface";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

const defaultSettings = {
	initial_delay: 100,
	repeat: 100,
	melody: "123456789987654321",
	magic_words1: "jerk, masturbate, stroke",
	magic_words2: "instruction",
	magic_words3: "",
	magic_words4: "not allowed, forbidden",

};


let storedvalue = false;
let client;
let currentMelody;

registerSlashCommand("intiface", commandFunction, ["Start vibration"], "Your character is controlling your remote device /help", true, true);

function commandFunction(args) {
	startFun();
}

eventSource.on(event_types.MESSAGE_RECEIVED, handleIncomingMessage);

function handleIncomingMessage(data) {

	const context = getContext();
	const chat = context.chat;
	const message = structuredClone(chat[chat.length - 1])

	var start1 = false;

	extension_settings.intiface.magic_words1.split(",").forEach(function(item) {
		if (message.mes.toLowerCase().includes(item.toLowerCase().trim()))
			start1 = true;
	});

	var start2 = false;

	extension_settings.intiface.magic_words2.split(",").forEach(function(item) {
		if (message.mes.toLowerCase().includes(item.toLowerCase().trim()))
			start2 = true;
	});

	var start3 = false;

	extension_settings.intiface.magic_words3.split(",").forEach(function(item) {
		if (message.mes.toLowerCase().includes(item.toLowerCase().trim()))
			start3 = true;
	});

	var start4 = true;

	extension_settings.intiface.magic_words4.split(",").forEach(function(item) {
		if (message.mes.toLowerCase().includes(item.toLowerCase().trim()))
			start4 = false;
	});

	if (start1 == true && start2 == true && start3 == true && start4 == true) {
		startFun();
	}

}

async function startFun() {
	currentMelody = "";
	for(var i=0;i<extension_settings.intiface.repeat;i++)
	 currentMelody = currentMelody +extension_settings.intiface.melody;
	doThings();

}

eventSource.on(event_types.MESSAGE_SENT, handleOutgoingMessage);

function handleOutgoingMessage(data) {

}




// Loads the extension settings if they exist, otherwise initializes them to the defaults.
async function loadSettings() {
	//Create the settings if they don't exist
	extension_settings['intiface'] = extension_settings['intiface'] || {};
	if (Object.keys(extension_settings['intiface']).length === 0) {
		Object.assign(extension_settings['intiface'], defaultSettings);
	}

	$('#intiface_initial_delay').val(extension_settings.intiface.initial_delay).trigger('input');
	$('#intiface_repeat').val(extension_settings.intiface.repeat).trigger('input');
	$('#intiface_melody').val(extension_settings.intiface.melody).trigger('input');
	$('#intiface_magic_words1').val(extension_settings.intiface.magic_words1).trigger('input');
	$('#intiface_magic_words2').val(extension_settings.intiface.magic_words2).trigger('input');
	$('#intiface_magic_words3').val(extension_settings.intiface.magic_words3).trigger('input');
	$('#intiface_magic_words4').val(extension_settings.intiface.magic_words4).trigger('input');

}


// This function is called when the button is clicked
function onButtonClick() {
	// You can do whatever you want here
	// Let's make a popup appear with the checked setting

	startFun();

	//	toastr.info(
	//		"hallo",
	//		"A popup appeared because you clicked the button!"
	//	);
}

function doWait() {
	sleep(1100-(extension_settings.intiface.initial_delay*10)).then(() => {
		if (currentMelody.length > 1) {
			currentMelody = currentMelody.substring(1);
			doThings();
		}
		else
			client.devices.forEach((device) => device.stop());
	});

}



async function doThings() {
	try {
		if (!client) {
			let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://localhost:12345");
			client = new Buttplug.ButtplugClient("Websocket Connection Example");
			await client.connect(connector);
		}
		var test = parseFloat(currentMelody.substring(0, 1));
		client.devices.forEach((device) => device.vibrate(parseFloat(currentMelody.substring(0, 1))/10.0));
		doWait();
	}
	catch (ex) {
		console.log(ex);
	}


}




function onLoopDurationInput() {
	extension_settings.intiface.loop_duration = Number($('#intiface_loop_duration').val());
	$('#intiface_loop_duration_value').text(extension_settings.intiface.loop_duration.toFixed(1));
	saveSettingsDebounced();
}

function onLeaveLoopInput() {
	extension_settings.intiface.leave_loop = Number($('#intiface_leave_loop').val());
	$('#intiface_leave_loop_value').text(extension_settings.intiface.leave_loop.toFixed(1));
	saveSettingsDebounced();
}

function onLeaveintifaceInput() {
	extension_settings.intiface.leave_intiface = Number($('#intiface_leave_intiface').val());
	$('#intiface_leave_intiface_value').text(extension_settings.intiface.leave_intiface.toFixed(1));
	saveSettingsDebounced();
}

function onCumInput() {
	extension_settings.intiface.cum = Number($('#intiface_cum').val());
	$('#intiface_cum_value').text(extension_settings.intiface.cum.toFixed(1));
	saveSettingsDebounced();
}

function onEncouragePerLoopInput() {
	extension_settings.intiface.encourage_loop = Number($('#intiface_encourage_loop').val());
	$('#intiface_encourage_loop_value').text(extension_settings.intiface.encourage_loop.toFixed(1));
	saveSettingsDebounced();
}

function onInitialDelayInput() {
	extension_settings.intiface.initial_delay = Number($('#intiface_initial_delay').val());
	$('#intiface_initial_delay_value').text(extension_settings.intiface.initial_delay.toFixed(1));
	saveSettingsDebounced();
}

function onRepeatInput() {
	extension_settings.intiface.repeat = Number($('#intiface_repeat').val());
	$('#intiface_repeat_value').text(extension_settings.intiface.repeat.toFixed(1));
	saveSettingsDebounced();
}


function onMelodyInput() {
	extension_settings.intiface.melody = $('#intiface_melody').val().trim().replace(/\D/g,'');
	saveSettingsDebounced();
}

function onMagicWords1Input() {
	extension_settings.intiface.magic_words1 = $('#intiface_magic_words1').val().trim();
	let element = document.getElementById("intiface_magic_words1_label");
	if (extension_settings.intiface.magic_words1.length > 0)
		element.style.opacity = 1.00;
	else
		element.style.opacity = 0.25;
	saveSettingsDebounced();
}

function onMagicWords2Input() {
	extension_settings.intiface.magic_words2 = $('#intiface_magic_words2').val().trim();
	let element = document.getElementById("intiface_magic_words2_label");
	if (extension_settings.intiface.magic_words2.length > 0)
		element.style.opacity = 1.00;
	else
		element.style.opacity = 0.25;
	saveSettingsDebounced();
}

function onMagicWords3Input() {
	extension_settings.intiface.magic_words3 = $('#intiface_magic_words3').val().trim();
	let element = document.getElementById("intiface_magic_words3_label");
	if (extension_settings.intiface.magic_words3.length > 0)
		element.style.opacity = 1.00;
	else
		element.style.opacity = 0.25;
	saveSettingsDebounced();
}

function onMagicWords4Input() {
	extension_settings.intiface.magic_words4 = $('#intiface_magic_words4').val().trim();
	let element = document.getElementById("intiface_magic_words4_label");
	if (extension_settings.intiface.magic_words4.length > 0)
		element.style.opacity = 1.00;
	else
		element.style.opacity = 0.25;
	saveSettingsDebounced();
}


// This function is called when the extension is loaded
jQuery(async () => {

	// This is an example of loading HTML from a file
	const settingsHtml = await $.get(`${extensionFolderPath}/intiface.html`);

	// Append settingsHtml to extensions_settings
	// extension_settings and extensions_settings2 are the left and right columns of the settings menu
	// Left should be extensions that deal with system functions and right should be visual/UI related
	$("#extensions_settings").append(settingsHtml);

	// These are examples of listening for events
	$("#intiface_button").on("click", onButtonClick);

	$('#intiface_repeat').on('input', onRepeatInput);
	$('#intiface_initial_delay').on('input', onInitialDelayInput);
	$('#intiface_loop_duration').on('input', onLoopDurationInput);
	$('#intiface_leave_loop').on('input', onLeaveLoopInput);
	$('#intiface_encourage_loop').on('input', onEncouragePerLoopInput);
	$('#intiface_leave_intiface').on('input', onLeaveintifaceInput);
	$('#intiface_cum').on('input', onCumInput);
	$('#intiface_melody').on('input', onMelodyInput);
	$('#intiface_magic_words1').on('input', onMagicWords1Input);
	$('#intiface_magic_words2').on('input', onMagicWords2Input);
	$('#intiface_magic_words3').on('input', onMagicWords3Input);
	$('#intiface_magic_words4').on('input', onMagicWords4Input);

	// Load settings when starting things up (if you have any)
	loadSettings();
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
