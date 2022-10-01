import type {  VoiceState } from "discord.js";
import { BotContext } from "../context.js";
import { getConfig } from "../utils/configHandler.js";
// M

const config = getConfig();

export interface VoiceUpdateEvent {
    oldState: VoiceState;
    newState: VoiceState;
    createdAt: Date;
}

export class WoisData {
    static latestEvents: VoiceUpdateEvent[] = [];
}

export async function checkVoiceUpdate(oldState: VoiceState, newState: VoiceState, botContext: BotContext) {
    // User joined Channel
    if (oldState.channel === null && newState.channel !== null) {
        if (newState.channelId === config.ids.haupt_woischat) {
            WoisData.latestEvents.push({
                oldState,
                newState,
                createdAt: new Date()
            });
        }
    }

    // user left channel
    if (oldState.channel !== null && newState.channel === null) {
        if (newState.channelId === config.ids.haupt_woischat) {
            // Add to latest events
            WoisData.latestEvents.push({
                oldState,
                newState,
                createdAt: new Date()
            });
        }
    }
}
