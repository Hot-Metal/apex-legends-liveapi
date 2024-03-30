/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Any } from "./google/protobuf/any";
import Long = require("long");

export const protobufPackage = "rtech.liveapi";

/** Enum used to quickly described the target of a ChangeCamera operation */
export enum PlayerOfInterest {
  UNSPECIFIED = 0,
  /** NEXT - cycle through known Players in a team */
  NEXT = 1,
  PREVIOUS = 2,
  /** KILL_LEADER - Go to an interesting player */
  KILL_LEADER = 3,
  CLOSEST_ENEMY = 4,
  CLOSEST_PLAYER = 5,
  LATEST_ATTACKER = 6,
  UNRECOGNIZED = -1,
}

export function playerOfInterestFromJSON(object: any): PlayerOfInterest {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return PlayerOfInterest.UNSPECIFIED;
    case 1:
    case "NEXT":
      return PlayerOfInterest.NEXT;
    case 2:
    case "PREVIOUS":
      return PlayerOfInterest.PREVIOUS;
    case 3:
    case "KILL_LEADER":
      return PlayerOfInterest.KILL_LEADER;
    case 4:
    case "CLOSEST_ENEMY":
      return PlayerOfInterest.CLOSEST_ENEMY;
    case 5:
    case "CLOSEST_PLAYER":
      return PlayerOfInterest.CLOSEST_PLAYER;
    case 6:
    case "LATEST_ATTACKER":
      return PlayerOfInterest.LATEST_ATTACKER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlayerOfInterest.UNRECOGNIZED;
  }
}

export function playerOfInterestToJSON(object: PlayerOfInterest): string {
  switch (object) {
    case PlayerOfInterest.UNSPECIFIED:
      return "UNSPECIFIED";
    case PlayerOfInterest.NEXT:
      return "NEXT";
    case PlayerOfInterest.PREVIOUS:
      return "PREVIOUS";
    case PlayerOfInterest.KILL_LEADER:
      return "KILL_LEADER";
    case PlayerOfInterest.CLOSEST_ENEMY:
      return "CLOSEST_ENEMY";
    case PlayerOfInterest.CLOSEST_PLAYER:
      return "CLOSEST_PLAYER";
    case PlayerOfInterest.LATEST_ATTACKER:
      return "LATEST_ATTACKER";
    case PlayerOfInterest.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  name: string;
  teamId: number;
  pos: Vector3 | undefined;
  angles: Vector3 | undefined;
  currentHealth: number;
  maxHealth: number;
  shieldHealth: number;
  shieldMaxHealth: number;
  nucleusHash: string;
  hardwareName: string;
  teamName: string;
  squadIndex: number;
  character: string;
  skin: string;
}

export interface CustomMatchLobbyPlayer {
  name: string;
  teamId: number;
  nucleusHash: string;
  hardwareName: string;
}

export interface Datacenter {
  timestamp: number;
  category: string;
  name: string;
}

export interface Version {
  majorNum: number;
  minorNum: number;
  buildStamp: number;
  revision: string;
}

export interface InventoryItem {
  quantity: number;
  item: string;
  /** any mods or additional info on the item */
  extraData: string;
}

export interface LoadoutConfiguration {
  weapons: InventoryItem[];
  equipment: InventoryItem[];
}

/**
 * Traffic initialization
 * This message is sent upon successfully connecting over WebSockets
 */
export interface Init {
  timestamp: number;
  category: string;
  gameVersion: string;
  apiVersion: Version | undefined;
  platform: string;
  /** Named specified by `cl_liveapi_session_name` */
  name: string;
}

/**
 * Response to the CustomMatch_GetLobbyPlayers
 * Contains the list of all players in the lobby
 */
export interface CustomMatchLobbyPlayers {
  playerToken: string;
  players: CustomMatchLobbyPlayer[];
}

/** Event when the observer camera switches from viewing one player to another */
export interface ObserverSwitched {
  timestamp: number;
  category: string;
  observer: Player | undefined;
  target: Player | undefined;
  targetTeam: Player[];
}

/** Used by observers to annotate events uniquely */
export interface ObserverAnnotation {
  timestamp: number;
  category: string;
  annotationSerial: number;
}

/** Sent during the first phase of a match. This event gives a full description of what match is being played */
export interface MatchSetup {
  timestamp: number;
  category: string;
  map: string;
  playlistName: string;
  playlistDesc: string;
  datacenter: Datacenter | undefined;
  aimAssistOn: boolean;
  anonymousMode: boolean;
  serverId: string;
  startingLoadout: LoadoutConfiguration | undefined;
}

/** Sent whenever the match changes phases (e.g. prematch, playing) */
export interface GameStateChanged {
  timestamp: number;
  category: string;
  state: string;
}

/** Occurs when any player has locked in a character during legend select */
export interface CharacterSelected {
  timestamp: number;
  category: string;
  player: Player | undefined;
}

/** Event to summarize the match after it has ended */
export interface MatchStateEnd {
  timestamp: number;
  category: string;
  state: string;
  winners: Player[];
}

/** Fired whenever the ring begins moving in a match */
export interface RingStartClosing {
  timestamp: number;
  category: string;
  stage: number;
  center: Vector3 | undefined;
  currentRadius: number;
  endRadius: number;
  shrinkDuration: number;
}

/** Used when the ring has finished moving and prior to it moving again */
export interface RingFinishedClosing {
  timestamp: number;
  category: string;
  stage: number;
  center: Vector3 | undefined;
  currentRadius: number;
  shrinkDuration: number;
}

/** Used when a player has connected to the match */
export interface PlayerConnected {
  timestamp: number;
  category: string;
  player: Player | undefined;
}

/**
 * Used when a player has disconnected, even temporarily
 * `canReconnect` will indicate if the player is able to reconnect or has forfeited
 */
export interface PlayerDisconnected {
  timestamp: number;
  category: string;
  player: Player | undefined;
  canReconnect: boolean;
  isAlive: boolean;
}

/**
 * Generic event for a change in the player stats
 * Common stat names that can come with this event include "knockdowns", "revivesGiven", "kills"
 */
export interface PlayerStatChanged {
  timestamp: number;
  category: string;
  player: Player | undefined;
  statName: string;
  newValue: number;
}

/**
 * Event used to notify when a player goes above their current tier level
 * Tier levels start at 1. Following this event, players may have Upgrades to their legend
 * Selection of upgrades will produce a separate `LegendUpgradeSelected` event
 */
export interface PlayerUpgradeTierChanged {
  timestamp: number;
  category: string;
  player: Player | undefined;
  level: number;
}

/**
 * Event describing a player taking damage
 * Details includ the attacker, victim, the weapon used and the amount of damage
 */
export interface PlayerDamaged {
  timestamp: number;
  category: string;
  attacker: Player | undefined;
  victim: Player | undefined;
  weapon: string;
  damageInflicted: number;
}

/**
 * Sent when a player is killed. Details are similar to PlayerDamaged event
 * The `awardedTo` field describes the player that the kill is given to
 */
export interface PlayerKilled {
  timestamp: number;
  category: string;
  attacker: Player | undefined;
  victim: Player | undefined;
  awardedTo: Player | undefined;
  weapon: string;
}

/**
 * Event describing a player that has been downed after taking sufficient damage
 * Similar to PlayerDamaged, but may not be sent in certain game modes (e.g. Control)
 */
export interface PlayerDowned {
  timestamp: number;
  category: string;
  attacker: Player | undefined;
  victim: Player | undefined;
  weapon: string;
}

/**
 * Sent when a player is killed if there is an assist awarded
 * This event may come in rapid succession to the PlayerKilled event with a corresponding `victim` field
 */
export interface PlayerAssist {
  timestamp: number;
  category: string;
  assistant: Player | undefined;
  victim: Player | undefined;
  weapon: string;
}

/**
 * Occurs when the entire squad in a game has been eliminated
 * The event contains all player in said squad. May not occur in certain game modes
 */
export interface SquadEliminated {
  timestamp: number;
  category: string;
  players: Player[];
}

/**
 * Occurs when Gibraltars shield has taken any enemy damage
 * The field `damageInflicted` will indicate how much was absorbed by the shield
 */
export interface GibraltarShieldAbsorbed {
  timestamp: number;
  category: string;
  attacker: Player | undefined;
  victim: Player | undefined;
  damageInflicted: number;
}

/**
 * Occurs when Revenant, while using his Forged Shadows ultimate, takes any enemy damage
 * This event is distinct from `PlayerDamaged` since the player may receive no actual damage if the shadow is able to absorb it
 * The field `damageInflicted` will indicate how much damage (in total) was dealt
 * If there is any leftover damage that goes affects the player, that amount will be what is registered in a different `PlayerDamaged` event
 */
export interface RevenantForgedShadowDamaged {
  timestamp: number;
  category: string;
  attacker: Player | undefined;
  victim: Player | undefined;
  damageInflicted: number;
}

/**
 * Sent when a player is respawned and comes back into game
 * For example, when using a respawn beacon
 */
export interface PlayerRespawnTeam {
  timestamp: number;
  category: string;
  player: Player | undefined;
  respawned: string;
}

/**
 * Occurs when a player finishes assisting a downed player
 * May not be sent in certain game modes (e.g. Control)
 */
export interface PlayerRevive {
  timestamp: number;
  category: string;
  player: Player | undefined;
  revived: Player | undefined;
}

/** Specific Arenas-only event that occurs when players select an item */
export interface ArenasItemSelected {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
  quantity: number;
}

/** Specific Arenas-only event that occurs when players deselect an item */
export interface ArenasItemDeselected {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
  quantity: number;
}

/** Event that occurs when a player has picked up loot into their inventory */
export interface InventoryPickUp {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
  quantity: number;
}

/**
 * Event that occurs when a player has dropped loot from their inventory
 * The item itself may have attachments that will be described in the `extraData` field
 */
export interface InventoryDrop {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
  quantity: number;
  extraData: string[];
}

/** Used to indicate the player has used a consumable item (e.g. syringe, shield cell) from their inventory */
export interface InventoryUse {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
  quantity: number;
}

/** Event used when a teammate banner has been picked up */
export interface BannerCollected {
  timestamp: number;
  category: string;
  player: Player | undefined;
  collected: Player | undefined;
}

/**
 * Used to indicate that the player has activated one of their legend's abilities
 * The ability can be a Tactical or an Ultimate and is decribed in the `linkedEntity` field
 * For example: `linkedEntity: "Tactical (Eye of the Allfather)"` for Bloodhound's tactical
 */
export interface PlayerAbilityUsed {
  timestamp: number;
  category: string;
  player: Player | undefined;
  linkedEntity: string;
}

/**
 * Signals that a player has selected an upgrade at a particular tier level
 * Updates to their tier level will be sent as a PlayerUpgradeTierChanged event
 */
export interface LegendUpgradeSelected {
  timestamp: number;
  category: string;
  player: Player | undefined;
  upgradeName: string;
  upgradeDesc: string;
  level: number;
}

/** Indicates that a player has started using the zipline */
export interface ZiplineUsed {
  timestamp: number;
  category: string;
  player: Player | undefined;
  linkedEntity: string;
}

/**
 * Used to indicate that a player has tossed a grenade
 * The `linkedEntity` will describe the grenade in further detail and it may be a legend's Ability
 * For example: `linkedEntity: "Ultimate (Rolling Thunder)"` for Bangalore's Ultimate ability
 */
export interface GrenadeThrown {
  timestamp: number;
  category: string;
  player: Player | undefined;
  linkedEntity: string;
}

/**
 * Event specifying that a player has picked up loot from Loba's Black Market
 * This event may fire in quick succession to the InventoryPickUp event
 */
export interface BlackMarketAction {
  timestamp: number;
  category: string;
  player: Player | undefined;
  item: string;
}

/** Used to indicate a player has traversed a Wraith Portal */
export interface WraithPortal {
  timestamp: number;
  category: string;
  player: Player | undefined;
}

/** Used to indicate a player has traversed a Warp Gate */
export interface WarpGateUsed {
  timestamp: number;
  category: string;
  player: Player | undefined;
}

/**
 * Used to indicate that a player has used ammo
 * This event may not fire immediately and updates may be batched to save bandwidth
 */
export interface AmmoUsed {
  timestamp: number;
  category: string;
  player: Player | undefined;
  ammoType: string;
  amountUsed: number;
  oldAmmoCount: number;
  newAmmoCount: number;
}

/** Used to indicate that a player has switched weapons, either to a weapon in their inventory or swapped with a weapon on the ground */
export interface WeaponSwitched {
  timestamp: number;
  category: string;
  player: Player | undefined;
  oldWeapon: string;
  newWeapon: string;
}

/**
 * Request to change the observer camera
 * If changing by a target's name, be aware that the
 *   - server may skip the request if the player is not actively in the game (i.e. waiting for reconnect, downed or killed)
 *   - If the string is longer than 256 characters, the request will fail
 */
export interface ChangeCamera {
  /** Set the camera to an interesting player (e.g. the Kill Leader) */
  poi?:
    | PlayerOfInterest
    | undefined;
  /** Change camera to a player by name */
  name?: string | undefined;
}

/** Request message to toggle pause in a match type that supports it */
export interface PauseToggle {
  preTimer: number;
}

/** Request to create a custom match lobby */
export interface CustomMatchCreateLobby {
}

/** Request to join an existing custom match lobby identified by the `roleToken` */
export interface CustomMatchJoinLobby {
  roleToken: string;
}

/** Request to leave a custom match lobby */
export interface CustomMatchLeaveLobby {
}

/** Request to programatically change your player's ready state in a custom match lobby */
export interface CustomMatchSetReady {
  isReady: boolean;
}

/** Request to retrieve all connected players in a custom match lobby */
export interface CustomMatchGetLobbyPlayers {
}

/**
 * Request to change the state of matchmaking in a custom match lobby
 * When enabled is True, the lobby will attempt to being a match
 */
export interface CustomMatchSetMatchmaking {
  enabled: boolean;
}

/**
 * Request to assign a particular player to a specific team
 * Note that the `targetHardwareName` and `targetNucleusHash` can be obtained from a prior request to CustomMatch_GetLobbyPlayers
 * If the parameters do not match any lobby player, the request is ignored
 * The `teamId` is across the entire lobby. Meaning, observers have a teamId of 0 and match players will be teamId of 1 and upwards
 */
export interface CustomMatchSetTeam {
  teamId: number;
  targetHardwareName: string;
  targetNucleusHash: string;
}

/** Request to remove a player from the currently connected custom match lobby */
export interface CustomMatchKickPlayer {
  targetHardwareName: string;
  targetNucleusHash: string;
}

/**
 * Request to alter the settings of a custom match lobby
 * Your request should specify all fields being set with the new value
 * For convinience, call `CustomMatch_GetSettings` to get the full state of settings
 */
export interface CustomMatchSetSettings {
  playlistName: string;
  adminChat: boolean;
  teamRename: boolean;
  selfAssign: boolean;
  aimAssist: boolean;
  anonMode: boolean;
}

/**
 * Review all the current settings. This request will be replied to with
 * `CustomMatch_SetSettings` from which you can modify and reply with any new values for your convenience
 */
export interface CustomMatchGetSettings {
}

/**
 * Request to set the name of a team in custom match lobby
 * Requires special access and is subject to text filtering
 */
export interface CustomMatchSetTeamName {
  teamId: number;
  teamName: string;
}

/** Request to programatically send a chat message to the entire custom match lobby */
export interface CustomMatchSendChat {
  text: string;
}

/**
 * Envelope message for any Live API request
 * This allows a single uniform data structure for requests to be made and for the game to receive them
 * Specifically, there is only one possible action per request. You can request an acknowledgement of your request by setting `withAck` to true
 * Acknowledgements will come in the form of a Response message. More information can be found with that event
 *
 * A single example to create a CustomMatch_JoinLobby request in python is as follows
 * ```
 * req = Request()
 * req.customMatch_JoinLobby.roleToken = "<some token>"
 * req.withAck = True
 * ```
 * For more information, consult the Protobuf documentation for your language of choice and look at details regarding the `oneof` field (https://protobuf.dev/programming-guides/proto3/#oneof)
 */
export interface Request {
  /** Receive an acknowledgement of the request having been received */
  withAck: boolean;
  /** Preshared key to use with the request. Only necessary if the connecting game has a preshared key specified through `cl_liveapi_requests_psk` */
  preSharedKey: string;
  changeCam?: ChangeCamera | undefined;
  pauseToggle?:
    | PauseToggle
    | undefined;
  /** Custom Match specific requests (reserved 10 -> 30) */
  customMatchCreateLobby?: CustomMatchCreateLobby | undefined;
  customMatchJoinLobby?: CustomMatchJoinLobby | undefined;
  customMatchLeaveLobby?: CustomMatchLeaveLobby | undefined;
  customMatchSetReady?: CustomMatchSetReady | undefined;
  customMatchSetMatchmaking?: CustomMatchSetMatchmaking | undefined;
  customMatchSetTeam?: CustomMatchSetTeam | undefined;
  customMatchKickPlayer?: CustomMatchKickPlayer | undefined;
  customMatchSetSettings?: CustomMatchSetSettings | undefined;
  customMatchSendChat?: CustomMatchSendChat | undefined;
  customMatchGetLobbyPlayers?: CustomMatchGetLobbyPlayers | undefined;
  customMatchSetTeamName?: CustomMatchSetTeamName | undefined;
  customMatchGetSettings?: CustomMatchGetSettings | undefined;
}

/**
 * Message used to indicate the status of a request
 * Generally, it is used to provide a plain text, detailed response in case of failures or problems
 */
export interface RequestStatus {
  status: string;
}

/**
 * Message used to indicate the response to a request made to the API
 * Only the requesting part will receive this message and this message is only sent if the request required an acknowledgement by setting `withAck` to true in the Request object
 * This message is always sent within a LiveAPIEvent and never on its own to allow any applications to have a uniform method of reading events over the wire
 * If `success` is true, it does not mean that the Request has finished or that it was completed correctly. In this case, it means that it was successfully received and contains no issues (it is a well-formed request)
 * The `result` field may sometimes be populated to give more context around the request, especially in the case of error
 * Refer to the LiveAPIEvent message on how to the the Any field
 */
export interface Response {
  success: boolean;
  result: Any | undefined;
}

/**
 * Envelope for all LiveAPI Events
 * Any game events or responses to requests will be sent using this message. The specific event or message is stored in the `gameMessage` field
 * Before proceeding, familiarize yourself with the proto3 `Any` field type at: https://protobuf.dev/programming-guides/proto3/#any
 * In order to read the message successfully, check the type contained in `gameMessage` and create an instance of that type where you can unpack the data to
 * Protobuf has several ways of doing type to instance lookups that will allow you to do this after you've generated bindings
 * For example, to read and unpack any LiveAPIEvent in Python, the following can be done (assume `pb_msg` contains the LiveAPIEvent object)
 * ```
 * from events_pb2 import *
 * from google.protobuf import symbol_database
 * [ ... ]
 * result_type = pb_msg.gameMessage.TypeName()
 * msg_result = symbol_database.Default().GetSymbol(result_type)()
 * pb_msg.gameMessage.Unpack(msg_result) # msg_result now holds the actual event you want to read
 * ```
 */
export interface LiveAPIEvent {
  eventSize: number;
  gameMessage: Any | undefined;
}

function createBaseVector3(): Vector3 {
  return { x: 0, y: 0, z: 0 };
}

export const Vector3 = {
  encode(message: Vector3, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vector3 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVector3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.z = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vector3 {
    return {
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
      z: isSet(object.z) ? globalThis.Number(object.z) : 0,
    };
  },

  toJSON(message: Vector3): unknown {
    const obj: any = {};
    if (message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== 0) {
      obj.y = message.y;
    }
    if (message.z !== 0) {
      obj.z = message.z;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vector3>, I>>(base?: I): Vector3 {
    return Vector3.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vector3>, I>>(object: I): Vector3 {
    const message = createBaseVector3();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    return message;
  },
};

function createBasePlayer(): Player {
  return {
    name: "",
    teamId: 0,
    pos: undefined,
    angles: undefined,
    currentHealth: 0,
    maxHealth: 0,
    shieldHealth: 0,
    shieldMaxHealth: 0,
    nucleusHash: "",
    hardwareName: "",
    teamName: "",
    squadIndex: 0,
    character: "",
    skin: "",
  };
}

export const Player = {
  encode(message: Player, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.teamId !== 0) {
      writer.uint32(16).uint32(message.teamId);
    }
    if (message.pos !== undefined) {
      Vector3.encode(message.pos, writer.uint32(26).fork()).ldelim();
    }
    if (message.angles !== undefined) {
      Vector3.encode(message.angles, writer.uint32(34).fork()).ldelim();
    }
    if (message.currentHealth !== 0) {
      writer.uint32(40).uint32(message.currentHealth);
    }
    if (message.maxHealth !== 0) {
      writer.uint32(48).uint32(message.maxHealth);
    }
    if (message.shieldHealth !== 0) {
      writer.uint32(56).uint32(message.shieldHealth);
    }
    if (message.shieldMaxHealth !== 0) {
      writer.uint32(64).uint32(message.shieldMaxHealth);
    }
    if (message.nucleusHash !== "") {
      writer.uint32(74).string(message.nucleusHash);
    }
    if (message.hardwareName !== "") {
      writer.uint32(82).string(message.hardwareName);
    }
    if (message.teamName !== "") {
      writer.uint32(90).string(message.teamName);
    }
    if (message.squadIndex !== 0) {
      writer.uint32(96).uint32(message.squadIndex);
    }
    if (message.character !== "") {
      writer.uint32(106).string(message.character);
    }
    if (message.skin !== "") {
      writer.uint32(114).string(message.skin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Player {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.teamId = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pos = Vector3.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.angles = Vector3.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.currentHealth = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.maxHealth = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.shieldHealth = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.shieldMaxHealth = reader.uint32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.nucleusHash = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.hardwareName = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.teamName = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.squadIndex = reader.uint32();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.character = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.skin = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Player {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      teamId: isSet(object.teamId) ? globalThis.Number(object.teamId) : 0,
      pos: isSet(object.pos) ? Vector3.fromJSON(object.pos) : undefined,
      angles: isSet(object.angles) ? Vector3.fromJSON(object.angles) : undefined,
      currentHealth: isSet(object.currentHealth) ? globalThis.Number(object.currentHealth) : 0,
      maxHealth: isSet(object.maxHealth) ? globalThis.Number(object.maxHealth) : 0,
      shieldHealth: isSet(object.shieldHealth) ? globalThis.Number(object.shieldHealth) : 0,
      shieldMaxHealth: isSet(object.shieldMaxHealth) ? globalThis.Number(object.shieldMaxHealth) : 0,
      nucleusHash: isSet(object.nucleusHash) ? globalThis.String(object.nucleusHash) : "",
      hardwareName: isSet(object.hardwareName) ? globalThis.String(object.hardwareName) : "",
      teamName: isSet(object.teamName) ? globalThis.String(object.teamName) : "",
      squadIndex: isSet(object.squadIndex) ? globalThis.Number(object.squadIndex) : 0,
      character: isSet(object.character) ? globalThis.String(object.character) : "",
      skin: isSet(object.skin) ? globalThis.String(object.skin) : "",
    };
  },

  toJSON(message: Player): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.teamId !== 0) {
      obj.teamId = Math.round(message.teamId);
    }
    if (message.pos !== undefined) {
      obj.pos = Vector3.toJSON(message.pos);
    }
    if (message.angles !== undefined) {
      obj.angles = Vector3.toJSON(message.angles);
    }
    if (message.currentHealth !== 0) {
      obj.currentHealth = Math.round(message.currentHealth);
    }
    if (message.maxHealth !== 0) {
      obj.maxHealth = Math.round(message.maxHealth);
    }
    if (message.shieldHealth !== 0) {
      obj.shieldHealth = Math.round(message.shieldHealth);
    }
    if (message.shieldMaxHealth !== 0) {
      obj.shieldMaxHealth = Math.round(message.shieldMaxHealth);
    }
    if (message.nucleusHash !== "") {
      obj.nucleusHash = message.nucleusHash;
    }
    if (message.hardwareName !== "") {
      obj.hardwareName = message.hardwareName;
    }
    if (message.teamName !== "") {
      obj.teamName = message.teamName;
    }
    if (message.squadIndex !== 0) {
      obj.squadIndex = Math.round(message.squadIndex);
    }
    if (message.character !== "") {
      obj.character = message.character;
    }
    if (message.skin !== "") {
      obj.skin = message.skin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Player>, I>>(base?: I): Player {
    return Player.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Player>, I>>(object: I): Player {
    const message = createBasePlayer();
    message.name = object.name ?? "";
    message.teamId = object.teamId ?? 0;
    message.pos = (object.pos !== undefined && object.pos !== null) ? Vector3.fromPartial(object.pos) : undefined;
    message.angles = (object.angles !== undefined && object.angles !== null)
      ? Vector3.fromPartial(object.angles)
      : undefined;
    message.currentHealth = object.currentHealth ?? 0;
    message.maxHealth = object.maxHealth ?? 0;
    message.shieldHealth = object.shieldHealth ?? 0;
    message.shieldMaxHealth = object.shieldMaxHealth ?? 0;
    message.nucleusHash = object.nucleusHash ?? "";
    message.hardwareName = object.hardwareName ?? "";
    message.teamName = object.teamName ?? "";
    message.squadIndex = object.squadIndex ?? 0;
    message.character = object.character ?? "";
    message.skin = object.skin ?? "";
    return message;
  },
};

function createBaseCustomMatchLobbyPlayer(): CustomMatchLobbyPlayer {
  return { name: "", teamId: 0, nucleusHash: "", hardwareName: "" };
}

export const CustomMatchLobbyPlayer = {
  encode(message: CustomMatchLobbyPlayer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.teamId !== 0) {
      writer.uint32(16).uint32(message.teamId);
    }
    if (message.nucleusHash !== "") {
      writer.uint32(26).string(message.nucleusHash);
    }
    if (message.hardwareName !== "") {
      writer.uint32(34).string(message.hardwareName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchLobbyPlayer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchLobbyPlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.teamId = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nucleusHash = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hardwareName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchLobbyPlayer {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      teamId: isSet(object.teamId) ? globalThis.Number(object.teamId) : 0,
      nucleusHash: isSet(object.nucleusHash) ? globalThis.String(object.nucleusHash) : "",
      hardwareName: isSet(object.hardwareName) ? globalThis.String(object.hardwareName) : "",
    };
  },

  toJSON(message: CustomMatchLobbyPlayer): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.teamId !== 0) {
      obj.teamId = Math.round(message.teamId);
    }
    if (message.nucleusHash !== "") {
      obj.nucleusHash = message.nucleusHash;
    }
    if (message.hardwareName !== "") {
      obj.hardwareName = message.hardwareName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchLobbyPlayer>, I>>(base?: I): CustomMatchLobbyPlayer {
    return CustomMatchLobbyPlayer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchLobbyPlayer>, I>>(object: I): CustomMatchLobbyPlayer {
    const message = createBaseCustomMatchLobbyPlayer();
    message.name = object.name ?? "";
    message.teamId = object.teamId ?? 0;
    message.nucleusHash = object.nucleusHash ?? "";
    message.hardwareName = object.hardwareName ?? "";
    return message;
  },
};

function createBaseDatacenter(): Datacenter {
  return { timestamp: 0, category: "", name: "" };
}

export const Datacenter = {
  encode(message: Datacenter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Datacenter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatacenter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Datacenter {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Datacenter): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Datacenter>, I>>(base?: I): Datacenter {
    return Datacenter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Datacenter>, I>>(object: I): Datacenter {
    const message = createBaseDatacenter();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseVersion(): Version {
  return { majorNum: 0, minorNum: 0, buildStamp: 0, revision: "" };
}

export const Version = {
  encode(message: Version, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.majorNum !== 0) {
      writer.uint32(8).uint32(message.majorNum);
    }
    if (message.minorNum !== 0) {
      writer.uint32(16).uint32(message.minorNum);
    }
    if (message.buildStamp !== 0) {
      writer.uint32(24).uint32(message.buildStamp);
    }
    if (message.revision !== "") {
      writer.uint32(34).string(message.revision);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.majorNum = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minorNum = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.buildStamp = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.revision = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Version {
    return {
      majorNum: isSet(object.majorNum) ? globalThis.Number(object.majorNum) : 0,
      minorNum: isSet(object.minorNum) ? globalThis.Number(object.minorNum) : 0,
      buildStamp: isSet(object.buildStamp) ? globalThis.Number(object.buildStamp) : 0,
      revision: isSet(object.revision) ? globalThis.String(object.revision) : "",
    };
  },

  toJSON(message: Version): unknown {
    const obj: any = {};
    if (message.majorNum !== 0) {
      obj.majorNum = Math.round(message.majorNum);
    }
    if (message.minorNum !== 0) {
      obj.minorNum = Math.round(message.minorNum);
    }
    if (message.buildStamp !== 0) {
      obj.buildStamp = Math.round(message.buildStamp);
    }
    if (message.revision !== "") {
      obj.revision = message.revision;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Version>, I>>(base?: I): Version {
    return Version.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Version>, I>>(object: I): Version {
    const message = createBaseVersion();
    message.majorNum = object.majorNum ?? 0;
    message.minorNum = object.minorNum ?? 0;
    message.buildStamp = object.buildStamp ?? 0;
    message.revision = object.revision ?? "";
    return message;
  },
};

function createBaseInventoryItem(): InventoryItem {
  return { quantity: 0, item: "", extraData: "" };
}

export const InventoryItem = {
  encode(message: InventoryItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.quantity !== 0) {
      writer.uint32(8).int32(message.quantity);
    }
    if (message.item !== "") {
      writer.uint32(18).string(message.item);
    }
    if (message.extraData !== "") {
      writer.uint32(26).string(message.extraData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InventoryItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInventoryItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.quantity = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.item = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.extraData = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InventoryItem {
    return {
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      extraData: isSet(object.extraData) ? globalThis.String(object.extraData) : "",
    };
  },

  toJSON(message: InventoryItem): unknown {
    const obj: any = {};
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.extraData !== "") {
      obj.extraData = message.extraData;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InventoryItem>, I>>(base?: I): InventoryItem {
    return InventoryItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InventoryItem>, I>>(object: I): InventoryItem {
    const message = createBaseInventoryItem();
    message.quantity = object.quantity ?? 0;
    message.item = object.item ?? "";
    message.extraData = object.extraData ?? "";
    return message;
  },
};

function createBaseLoadoutConfiguration(): LoadoutConfiguration {
  return { weapons: [], equipment: [] };
}

export const LoadoutConfiguration = {
  encode(message: LoadoutConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.weapons) {
      InventoryItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.equipment) {
      InventoryItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadoutConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadoutConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.weapons.push(InventoryItem.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.equipment.push(InventoryItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadoutConfiguration {
    return {
      weapons: globalThis.Array.isArray(object?.weapons)
        ? object.weapons.map((e: any) => InventoryItem.fromJSON(e))
        : [],
      equipment: globalThis.Array.isArray(object?.equipment)
        ? object.equipment.map((e: any) => InventoryItem.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoadoutConfiguration): unknown {
    const obj: any = {};
    if (message.weapons?.length) {
      obj.weapons = message.weapons.map((e) => InventoryItem.toJSON(e));
    }
    if (message.equipment?.length) {
      obj.equipment = message.equipment.map((e) => InventoryItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoadoutConfiguration>, I>>(base?: I): LoadoutConfiguration {
    return LoadoutConfiguration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoadoutConfiguration>, I>>(object: I): LoadoutConfiguration {
    const message = createBaseLoadoutConfiguration();
    message.weapons = object.weapons?.map((e) => InventoryItem.fromPartial(e)) || [];
    message.equipment = object.equipment?.map((e) => InventoryItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInit(): Init {
  return { timestamp: 0, category: "", gameVersion: "", apiVersion: undefined, platform: "", name: "" };
}

export const Init = {
  encode(message: Init, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.gameVersion !== "") {
      writer.uint32(26).string(message.gameVersion);
    }
    if (message.apiVersion !== undefined) {
      Version.encode(message.apiVersion, writer.uint32(34).fork()).ldelim();
    }
    if (message.platform !== "") {
      writer.uint32(42).string(message.platform);
    }
    if (message.name !== "") {
      writer.uint32(50).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Init {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gameVersion = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.apiVersion = Version.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.platform = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Init {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      gameVersion: isSet(object.gameVersion) ? globalThis.String(object.gameVersion) : "",
      apiVersion: isSet(object.apiVersion) ? Version.fromJSON(object.apiVersion) : undefined,
      platform: isSet(object.platform) ? globalThis.String(object.platform) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Init): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.gameVersion !== "") {
      obj.gameVersion = message.gameVersion;
    }
    if (message.apiVersion !== undefined) {
      obj.apiVersion = Version.toJSON(message.apiVersion);
    }
    if (message.platform !== "") {
      obj.platform = message.platform;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Init>, I>>(base?: I): Init {
    return Init.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Init>, I>>(object: I): Init {
    const message = createBaseInit();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.gameVersion = object.gameVersion ?? "";
    message.apiVersion = (object.apiVersion !== undefined && object.apiVersion !== null)
      ? Version.fromPartial(object.apiVersion)
      : undefined;
    message.platform = object.platform ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCustomMatchLobbyPlayers(): CustomMatchLobbyPlayers {
  return { playerToken: "", players: [] };
}

export const CustomMatchLobbyPlayers = {
  encode(message: CustomMatchLobbyPlayers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playerToken !== "") {
      writer.uint32(10).string(message.playerToken);
    }
    for (const v of message.players) {
      CustomMatchLobbyPlayer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchLobbyPlayers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchLobbyPlayers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.playerToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.players.push(CustomMatchLobbyPlayer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchLobbyPlayers {
    return {
      playerToken: isSet(object.playerToken) ? globalThis.String(object.playerToken) : "",
      players: globalThis.Array.isArray(object?.players)
        ? object.players.map((e: any) => CustomMatchLobbyPlayer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CustomMatchLobbyPlayers): unknown {
    const obj: any = {};
    if (message.playerToken !== "") {
      obj.playerToken = message.playerToken;
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => CustomMatchLobbyPlayer.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchLobbyPlayers>, I>>(base?: I): CustomMatchLobbyPlayers {
    return CustomMatchLobbyPlayers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchLobbyPlayers>, I>>(object: I): CustomMatchLobbyPlayers {
    const message = createBaseCustomMatchLobbyPlayers();
    message.playerToken = object.playerToken ?? "";
    message.players = object.players?.map((e) => CustomMatchLobbyPlayer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseObserverSwitched(): ObserverSwitched {
  return { timestamp: 0, category: "", observer: undefined, target: undefined, targetTeam: [] };
}

export const ObserverSwitched = {
  encode(message: ObserverSwitched, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.observer !== undefined) {
      Player.encode(message.observer, writer.uint32(26).fork()).ldelim();
    }
    if (message.target !== undefined) {
      Player.encode(message.target, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.targetTeam) {
      Player.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObserverSwitched {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObserverSwitched();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.observer = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.target = Player.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.targetTeam.push(Player.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ObserverSwitched {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      observer: isSet(object.observer) ? Player.fromJSON(object.observer) : undefined,
      target: isSet(object.target) ? Player.fromJSON(object.target) : undefined,
      targetTeam: globalThis.Array.isArray(object?.targetTeam)
        ? object.targetTeam.map((e: any) => Player.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ObserverSwitched): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.observer !== undefined) {
      obj.observer = Player.toJSON(message.observer);
    }
    if (message.target !== undefined) {
      obj.target = Player.toJSON(message.target);
    }
    if (message.targetTeam?.length) {
      obj.targetTeam = message.targetTeam.map((e) => Player.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ObserverSwitched>, I>>(base?: I): ObserverSwitched {
    return ObserverSwitched.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ObserverSwitched>, I>>(object: I): ObserverSwitched {
    const message = createBaseObserverSwitched();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.observer = (object.observer !== undefined && object.observer !== null)
      ? Player.fromPartial(object.observer)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? Player.fromPartial(object.target)
      : undefined;
    message.targetTeam = object.targetTeam?.map((e) => Player.fromPartial(e)) || [];
    return message;
  },
};

function createBaseObserverAnnotation(): ObserverAnnotation {
  return { timestamp: 0, category: "", annotationSerial: 0 };
}

export const ObserverAnnotation = {
  encode(message: ObserverAnnotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.annotationSerial !== 0) {
      writer.uint32(24).int32(message.annotationSerial);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObserverAnnotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObserverAnnotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.annotationSerial = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ObserverAnnotation {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      annotationSerial: isSet(object.annotationSerial) ? globalThis.Number(object.annotationSerial) : 0,
    };
  },

  toJSON(message: ObserverAnnotation): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.annotationSerial !== 0) {
      obj.annotationSerial = Math.round(message.annotationSerial);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ObserverAnnotation>, I>>(base?: I): ObserverAnnotation {
    return ObserverAnnotation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ObserverAnnotation>, I>>(object: I): ObserverAnnotation {
    const message = createBaseObserverAnnotation();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.annotationSerial = object.annotationSerial ?? 0;
    return message;
  },
};

function createBaseMatchSetup(): MatchSetup {
  return {
    timestamp: 0,
    category: "",
    map: "",
    playlistName: "",
    playlistDesc: "",
    datacenter: undefined,
    aimAssistOn: false,
    anonymousMode: false,
    serverId: "",
    startingLoadout: undefined,
  };
}

export const MatchSetup = {
  encode(message: MatchSetup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.map !== "") {
      writer.uint32(26).string(message.map);
    }
    if (message.playlistName !== "") {
      writer.uint32(34).string(message.playlistName);
    }
    if (message.playlistDesc !== "") {
      writer.uint32(42).string(message.playlistDesc);
    }
    if (message.datacenter !== undefined) {
      Datacenter.encode(message.datacenter, writer.uint32(50).fork()).ldelim();
    }
    if (message.aimAssistOn !== false) {
      writer.uint32(56).bool(message.aimAssistOn);
    }
    if (message.anonymousMode !== false) {
      writer.uint32(64).bool(message.anonymousMode);
    }
    if (message.serverId !== "") {
      writer.uint32(74).string(message.serverId);
    }
    if (message.startingLoadout !== undefined) {
      LoadoutConfiguration.encode(message.startingLoadout, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchSetup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchSetup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.map = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.playlistName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.playlistDesc = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.datacenter = Datacenter.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.aimAssistOn = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.anonymousMode = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.serverId = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.startingLoadout = LoadoutConfiguration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MatchSetup {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      map: isSet(object.map) ? globalThis.String(object.map) : "",
      playlistName: isSet(object.playlistName) ? globalThis.String(object.playlistName) : "",
      playlistDesc: isSet(object.playlistDesc) ? globalThis.String(object.playlistDesc) : "",
      datacenter: isSet(object.datacenter) ? Datacenter.fromJSON(object.datacenter) : undefined,
      aimAssistOn: isSet(object.aimAssistOn) ? globalThis.Boolean(object.aimAssistOn) : false,
      anonymousMode: isSet(object.anonymousMode) ? globalThis.Boolean(object.anonymousMode) : false,
      serverId: isSet(object.serverId) ? globalThis.String(object.serverId) : "",
      startingLoadout: isSet(object.startingLoadout)
        ? LoadoutConfiguration.fromJSON(object.startingLoadout)
        : undefined,
    };
  },

  toJSON(message: MatchSetup): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.map !== "") {
      obj.map = message.map;
    }
    if (message.playlistName !== "") {
      obj.playlistName = message.playlistName;
    }
    if (message.playlistDesc !== "") {
      obj.playlistDesc = message.playlistDesc;
    }
    if (message.datacenter !== undefined) {
      obj.datacenter = Datacenter.toJSON(message.datacenter);
    }
    if (message.aimAssistOn !== false) {
      obj.aimAssistOn = message.aimAssistOn;
    }
    if (message.anonymousMode !== false) {
      obj.anonymousMode = message.anonymousMode;
    }
    if (message.serverId !== "") {
      obj.serverId = message.serverId;
    }
    if (message.startingLoadout !== undefined) {
      obj.startingLoadout = LoadoutConfiguration.toJSON(message.startingLoadout);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchSetup>, I>>(base?: I): MatchSetup {
    return MatchSetup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MatchSetup>, I>>(object: I): MatchSetup {
    const message = createBaseMatchSetup();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.map = object.map ?? "";
    message.playlistName = object.playlistName ?? "";
    message.playlistDesc = object.playlistDesc ?? "";
    message.datacenter = (object.datacenter !== undefined && object.datacenter !== null)
      ? Datacenter.fromPartial(object.datacenter)
      : undefined;
    message.aimAssistOn = object.aimAssistOn ?? false;
    message.anonymousMode = object.anonymousMode ?? false;
    message.serverId = object.serverId ?? "";
    message.startingLoadout = (object.startingLoadout !== undefined && object.startingLoadout !== null)
      ? LoadoutConfiguration.fromPartial(object.startingLoadout)
      : undefined;
    return message;
  },
};

function createBaseGameStateChanged(): GameStateChanged {
  return { timestamp: 0, category: "", state: "" };
}

export const GameStateChanged = {
  encode(message: GameStateChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameStateChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameStateChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameStateChanged {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      state: isSet(object.state) ? globalThis.String(object.state) : "",
    };
  },

  toJSON(message: GameStateChanged): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameStateChanged>, I>>(base?: I): GameStateChanged {
    return GameStateChanged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameStateChanged>, I>>(object: I): GameStateChanged {
    const message = createBaseGameStateChanged();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.state = object.state ?? "";
    return message;
  },
};

function createBaseCharacterSelected(): CharacterSelected {
  return { timestamp: 0, category: "", player: undefined };
}

export const CharacterSelected = {
  encode(message: CharacterSelected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CharacterSelected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCharacterSelected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CharacterSelected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
    };
  },

  toJSON(message: CharacterSelected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CharacterSelected>, I>>(base?: I): CharacterSelected {
    return CharacterSelected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CharacterSelected>, I>>(object: I): CharacterSelected {
    const message = createBaseCharacterSelected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    return message;
  },
};

function createBaseMatchStateEnd(): MatchStateEnd {
  return { timestamp: 0, category: "", state: "", winners: [] };
}

export const MatchStateEnd = {
  encode(message: MatchStateEnd, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    for (const v of message.winners) {
      Player.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchStateEnd {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchStateEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.winners.push(Player.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MatchStateEnd {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      state: isSet(object.state) ? globalThis.String(object.state) : "",
      winners: globalThis.Array.isArray(object?.winners) ? object.winners.map((e: any) => Player.fromJSON(e)) : [],
    };
  },

  toJSON(message: MatchStateEnd): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    if (message.winners?.length) {
      obj.winners = message.winners.map((e) => Player.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchStateEnd>, I>>(base?: I): MatchStateEnd {
    return MatchStateEnd.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MatchStateEnd>, I>>(object: I): MatchStateEnd {
    const message = createBaseMatchStateEnd();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.state = object.state ?? "";
    message.winners = object.winners?.map((e) => Player.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRingStartClosing(): RingStartClosing {
  return { timestamp: 0, category: "", stage: 0, center: undefined, currentRadius: 0, endRadius: 0, shrinkDuration: 0 };
}

export const RingStartClosing = {
  encode(message: RingStartClosing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.stage !== 0) {
      writer.uint32(24).uint32(message.stage);
    }
    if (message.center !== undefined) {
      Vector3.encode(message.center, writer.uint32(34).fork()).ldelim();
    }
    if (message.currentRadius !== 0) {
      writer.uint32(45).float(message.currentRadius);
    }
    if (message.endRadius !== 0) {
      writer.uint32(53).float(message.endRadius);
    }
    if (message.shrinkDuration !== 0) {
      writer.uint32(61).float(message.shrinkDuration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RingStartClosing {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRingStartClosing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stage = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.center = Vector3.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.currentRadius = reader.float();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }

          message.endRadius = reader.float();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }

          message.shrinkDuration = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RingStartClosing {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      stage: isSet(object.stage) ? globalThis.Number(object.stage) : 0,
      center: isSet(object.center) ? Vector3.fromJSON(object.center) : undefined,
      currentRadius: isSet(object.currentRadius) ? globalThis.Number(object.currentRadius) : 0,
      endRadius: isSet(object.endRadius) ? globalThis.Number(object.endRadius) : 0,
      shrinkDuration: isSet(object.shrinkDuration) ? globalThis.Number(object.shrinkDuration) : 0,
    };
  },

  toJSON(message: RingStartClosing): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.stage !== 0) {
      obj.stage = Math.round(message.stage);
    }
    if (message.center !== undefined) {
      obj.center = Vector3.toJSON(message.center);
    }
    if (message.currentRadius !== 0) {
      obj.currentRadius = message.currentRadius;
    }
    if (message.endRadius !== 0) {
      obj.endRadius = message.endRadius;
    }
    if (message.shrinkDuration !== 0) {
      obj.shrinkDuration = message.shrinkDuration;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RingStartClosing>, I>>(base?: I): RingStartClosing {
    return RingStartClosing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RingStartClosing>, I>>(object: I): RingStartClosing {
    const message = createBaseRingStartClosing();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.stage = object.stage ?? 0;
    message.center = (object.center !== undefined && object.center !== null)
      ? Vector3.fromPartial(object.center)
      : undefined;
    message.currentRadius = object.currentRadius ?? 0;
    message.endRadius = object.endRadius ?? 0;
    message.shrinkDuration = object.shrinkDuration ?? 0;
    return message;
  },
};

function createBaseRingFinishedClosing(): RingFinishedClosing {
  return { timestamp: 0, category: "", stage: 0, center: undefined, currentRadius: 0, shrinkDuration: 0 };
}

export const RingFinishedClosing = {
  encode(message: RingFinishedClosing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.stage !== 0) {
      writer.uint32(24).uint32(message.stage);
    }
    if (message.center !== undefined) {
      Vector3.encode(message.center, writer.uint32(34).fork()).ldelim();
    }
    if (message.currentRadius !== 0) {
      writer.uint32(45).float(message.currentRadius);
    }
    if (message.shrinkDuration !== 0) {
      writer.uint32(61).float(message.shrinkDuration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RingFinishedClosing {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRingFinishedClosing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stage = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.center = Vector3.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.currentRadius = reader.float();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }

          message.shrinkDuration = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RingFinishedClosing {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      stage: isSet(object.stage) ? globalThis.Number(object.stage) : 0,
      center: isSet(object.center) ? Vector3.fromJSON(object.center) : undefined,
      currentRadius: isSet(object.currentRadius) ? globalThis.Number(object.currentRadius) : 0,
      shrinkDuration: isSet(object.shrinkDuration) ? globalThis.Number(object.shrinkDuration) : 0,
    };
  },

  toJSON(message: RingFinishedClosing): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.stage !== 0) {
      obj.stage = Math.round(message.stage);
    }
    if (message.center !== undefined) {
      obj.center = Vector3.toJSON(message.center);
    }
    if (message.currentRadius !== 0) {
      obj.currentRadius = message.currentRadius;
    }
    if (message.shrinkDuration !== 0) {
      obj.shrinkDuration = message.shrinkDuration;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RingFinishedClosing>, I>>(base?: I): RingFinishedClosing {
    return RingFinishedClosing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RingFinishedClosing>, I>>(object: I): RingFinishedClosing {
    const message = createBaseRingFinishedClosing();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.stage = object.stage ?? 0;
    message.center = (object.center !== undefined && object.center !== null)
      ? Vector3.fromPartial(object.center)
      : undefined;
    message.currentRadius = object.currentRadius ?? 0;
    message.shrinkDuration = object.shrinkDuration ?? 0;
    return message;
  },
};

function createBasePlayerConnected(): PlayerConnected {
  return { timestamp: 0, category: "", player: undefined };
}

export const PlayerConnected = {
  encode(message: PlayerConnected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerConnected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerConnected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerConnected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
    };
  },

  toJSON(message: PlayerConnected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerConnected>, I>>(base?: I): PlayerConnected {
    return PlayerConnected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerConnected>, I>>(object: I): PlayerConnected {
    const message = createBasePlayerConnected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    return message;
  },
};

function createBasePlayerDisconnected(): PlayerDisconnected {
  return { timestamp: 0, category: "", player: undefined, canReconnect: false, isAlive: false };
}

export const PlayerDisconnected = {
  encode(message: PlayerDisconnected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.canReconnect !== false) {
      writer.uint32(32).bool(message.canReconnect);
    }
    if (message.isAlive !== false) {
      writer.uint32(40).bool(message.isAlive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerDisconnected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerDisconnected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.canReconnect = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isAlive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerDisconnected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      canReconnect: isSet(object.canReconnect) ? globalThis.Boolean(object.canReconnect) : false,
      isAlive: isSet(object.isAlive) ? globalThis.Boolean(object.isAlive) : false,
    };
  },

  toJSON(message: PlayerDisconnected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.canReconnect !== false) {
      obj.canReconnect = message.canReconnect;
    }
    if (message.isAlive !== false) {
      obj.isAlive = message.isAlive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerDisconnected>, I>>(base?: I): PlayerDisconnected {
    return PlayerDisconnected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerDisconnected>, I>>(object: I): PlayerDisconnected {
    const message = createBasePlayerDisconnected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.canReconnect = object.canReconnect ?? false;
    message.isAlive = object.isAlive ?? false;
    return message;
  },
};

function createBasePlayerStatChanged(): PlayerStatChanged {
  return { timestamp: 0, category: "", player: undefined, statName: "", newValue: 0 };
}

export const PlayerStatChanged = {
  encode(message: PlayerStatChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.statName !== "") {
      writer.uint32(34).string(message.statName);
    }
    if (message.newValue !== 0) {
      writer.uint32(40).uint32(message.newValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerStatChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerStatChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.statName = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.newValue = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerStatChanged {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      statName: isSet(object.statName) ? globalThis.String(object.statName) : "",
      newValue: isSet(object.newValue) ? globalThis.Number(object.newValue) : 0,
    };
  },

  toJSON(message: PlayerStatChanged): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.statName !== "") {
      obj.statName = message.statName;
    }
    if (message.newValue !== 0) {
      obj.newValue = Math.round(message.newValue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerStatChanged>, I>>(base?: I): PlayerStatChanged {
    return PlayerStatChanged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerStatChanged>, I>>(object: I): PlayerStatChanged {
    const message = createBasePlayerStatChanged();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.statName = object.statName ?? "";
    message.newValue = object.newValue ?? 0;
    return message;
  },
};

function createBasePlayerUpgradeTierChanged(): PlayerUpgradeTierChanged {
  return { timestamp: 0, category: "", player: undefined, level: 0 };
}

export const PlayerUpgradeTierChanged = {
  encode(message: PlayerUpgradeTierChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.level !== 0) {
      writer.uint32(32).int32(message.level);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerUpgradeTierChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerUpgradeTierChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.level = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerUpgradeTierChanged {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      level: isSet(object.level) ? globalThis.Number(object.level) : 0,
    };
  },

  toJSON(message: PlayerUpgradeTierChanged): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.level !== 0) {
      obj.level = Math.round(message.level);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerUpgradeTierChanged>, I>>(base?: I): PlayerUpgradeTierChanged {
    return PlayerUpgradeTierChanged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerUpgradeTierChanged>, I>>(object: I): PlayerUpgradeTierChanged {
    const message = createBasePlayerUpgradeTierChanged();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.level = object.level ?? 0;
    return message;
  },
};

function createBasePlayerDamaged(): PlayerDamaged {
  return { timestamp: 0, category: "", attacker: undefined, victim: undefined, weapon: "", damageInflicted: 0 };
}

export const PlayerDamaged = {
  encode(message: PlayerDamaged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.attacker !== undefined) {
      Player.encode(message.attacker, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.weapon !== "") {
      writer.uint32(42).string(message.weapon);
    }
    if (message.damageInflicted !== 0) {
      writer.uint32(48).uint32(message.damageInflicted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerDamaged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerDamaged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attacker = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.weapon = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.damageInflicted = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerDamaged {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      attacker: isSet(object.attacker) ? Player.fromJSON(object.attacker) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      weapon: isSet(object.weapon) ? globalThis.String(object.weapon) : "",
      damageInflicted: isSet(object.damageInflicted) ? globalThis.Number(object.damageInflicted) : 0,
    };
  },

  toJSON(message: PlayerDamaged): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.attacker !== undefined) {
      obj.attacker = Player.toJSON(message.attacker);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.weapon !== "") {
      obj.weapon = message.weapon;
    }
    if (message.damageInflicted !== 0) {
      obj.damageInflicted = Math.round(message.damageInflicted);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerDamaged>, I>>(base?: I): PlayerDamaged {
    return PlayerDamaged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerDamaged>, I>>(object: I): PlayerDamaged {
    const message = createBasePlayerDamaged();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.attacker = (object.attacker !== undefined && object.attacker !== null)
      ? Player.fromPartial(object.attacker)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.weapon = object.weapon ?? "";
    message.damageInflicted = object.damageInflicted ?? 0;
    return message;
  },
};

function createBasePlayerKilled(): PlayerKilled {
  return { timestamp: 0, category: "", attacker: undefined, victim: undefined, awardedTo: undefined, weapon: "" };
}

export const PlayerKilled = {
  encode(message: PlayerKilled, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.attacker !== undefined) {
      Player.encode(message.attacker, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.awardedTo !== undefined) {
      Player.encode(message.awardedTo, writer.uint32(42).fork()).ldelim();
    }
    if (message.weapon !== "") {
      writer.uint32(50).string(message.weapon);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerKilled {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerKilled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attacker = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.awardedTo = Player.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.weapon = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerKilled {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      attacker: isSet(object.attacker) ? Player.fromJSON(object.attacker) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      awardedTo: isSet(object.awardedTo) ? Player.fromJSON(object.awardedTo) : undefined,
      weapon: isSet(object.weapon) ? globalThis.String(object.weapon) : "",
    };
  },

  toJSON(message: PlayerKilled): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.attacker !== undefined) {
      obj.attacker = Player.toJSON(message.attacker);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.awardedTo !== undefined) {
      obj.awardedTo = Player.toJSON(message.awardedTo);
    }
    if (message.weapon !== "") {
      obj.weapon = message.weapon;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerKilled>, I>>(base?: I): PlayerKilled {
    return PlayerKilled.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerKilled>, I>>(object: I): PlayerKilled {
    const message = createBasePlayerKilled();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.attacker = (object.attacker !== undefined && object.attacker !== null)
      ? Player.fromPartial(object.attacker)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.awardedTo = (object.awardedTo !== undefined && object.awardedTo !== null)
      ? Player.fromPartial(object.awardedTo)
      : undefined;
    message.weapon = object.weapon ?? "";
    return message;
  },
};

function createBasePlayerDowned(): PlayerDowned {
  return { timestamp: 0, category: "", attacker: undefined, victim: undefined, weapon: "" };
}

export const PlayerDowned = {
  encode(message: PlayerDowned, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.attacker !== undefined) {
      Player.encode(message.attacker, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.weapon !== "") {
      writer.uint32(42).string(message.weapon);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerDowned {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerDowned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attacker = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.weapon = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerDowned {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      attacker: isSet(object.attacker) ? Player.fromJSON(object.attacker) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      weapon: isSet(object.weapon) ? globalThis.String(object.weapon) : "",
    };
  },

  toJSON(message: PlayerDowned): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.attacker !== undefined) {
      obj.attacker = Player.toJSON(message.attacker);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.weapon !== "") {
      obj.weapon = message.weapon;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerDowned>, I>>(base?: I): PlayerDowned {
    return PlayerDowned.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerDowned>, I>>(object: I): PlayerDowned {
    const message = createBasePlayerDowned();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.attacker = (object.attacker !== undefined && object.attacker !== null)
      ? Player.fromPartial(object.attacker)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.weapon = object.weapon ?? "";
    return message;
  },
};

function createBasePlayerAssist(): PlayerAssist {
  return { timestamp: 0, category: "", assistant: undefined, victim: undefined, weapon: "" };
}

export const PlayerAssist = {
  encode(message: PlayerAssist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.assistant !== undefined) {
      Player.encode(message.assistant, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.weapon !== "") {
      writer.uint32(42).string(message.weapon);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerAssist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerAssist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.assistant = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.weapon = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerAssist {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      assistant: isSet(object.assistant) ? Player.fromJSON(object.assistant) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      weapon: isSet(object.weapon) ? globalThis.String(object.weapon) : "",
    };
  },

  toJSON(message: PlayerAssist): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.assistant !== undefined) {
      obj.assistant = Player.toJSON(message.assistant);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.weapon !== "") {
      obj.weapon = message.weapon;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerAssist>, I>>(base?: I): PlayerAssist {
    return PlayerAssist.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerAssist>, I>>(object: I): PlayerAssist {
    const message = createBasePlayerAssist();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.assistant = (object.assistant !== undefined && object.assistant !== null)
      ? Player.fromPartial(object.assistant)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.weapon = object.weapon ?? "";
    return message;
  },
};

function createBaseSquadEliminated(): SquadEliminated {
  return { timestamp: 0, category: "", players: [] };
}

export const SquadEliminated = {
  encode(message: SquadEliminated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    for (const v of message.players) {
      Player.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SquadEliminated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSquadEliminated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.players.push(Player.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SquadEliminated {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      players: globalThis.Array.isArray(object?.players) ? object.players.map((e: any) => Player.fromJSON(e)) : [],
    };
  },

  toJSON(message: SquadEliminated): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => Player.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SquadEliminated>, I>>(base?: I): SquadEliminated {
    return SquadEliminated.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SquadEliminated>, I>>(object: I): SquadEliminated {
    const message = createBaseSquadEliminated();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.players = object.players?.map((e) => Player.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGibraltarShieldAbsorbed(): GibraltarShieldAbsorbed {
  return { timestamp: 0, category: "", attacker: undefined, victim: undefined, damageInflicted: 0 };
}

export const GibraltarShieldAbsorbed = {
  encode(message: GibraltarShieldAbsorbed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.attacker !== undefined) {
      Player.encode(message.attacker, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.damageInflicted !== 0) {
      writer.uint32(48).uint32(message.damageInflicted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GibraltarShieldAbsorbed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGibraltarShieldAbsorbed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attacker = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.damageInflicted = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GibraltarShieldAbsorbed {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      attacker: isSet(object.attacker) ? Player.fromJSON(object.attacker) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      damageInflicted: isSet(object.damageInflicted) ? globalThis.Number(object.damageInflicted) : 0,
    };
  },

  toJSON(message: GibraltarShieldAbsorbed): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.attacker !== undefined) {
      obj.attacker = Player.toJSON(message.attacker);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.damageInflicted !== 0) {
      obj.damageInflicted = Math.round(message.damageInflicted);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GibraltarShieldAbsorbed>, I>>(base?: I): GibraltarShieldAbsorbed {
    return GibraltarShieldAbsorbed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GibraltarShieldAbsorbed>, I>>(object: I): GibraltarShieldAbsorbed {
    const message = createBaseGibraltarShieldAbsorbed();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.attacker = (object.attacker !== undefined && object.attacker !== null)
      ? Player.fromPartial(object.attacker)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.damageInflicted = object.damageInflicted ?? 0;
    return message;
  },
};

function createBaseRevenantForgedShadowDamaged(): RevenantForgedShadowDamaged {
  return { timestamp: 0, category: "", attacker: undefined, victim: undefined, damageInflicted: 0 };
}

export const RevenantForgedShadowDamaged = {
  encode(message: RevenantForgedShadowDamaged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.attacker !== undefined) {
      Player.encode(message.attacker, writer.uint32(26).fork()).ldelim();
    }
    if (message.victim !== undefined) {
      Player.encode(message.victim, writer.uint32(34).fork()).ldelim();
    }
    if (message.damageInflicted !== 0) {
      writer.uint32(48).uint32(message.damageInflicted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevenantForgedShadowDamaged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevenantForgedShadowDamaged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attacker = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.victim = Player.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.damageInflicted = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevenantForgedShadowDamaged {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      attacker: isSet(object.attacker) ? Player.fromJSON(object.attacker) : undefined,
      victim: isSet(object.victim) ? Player.fromJSON(object.victim) : undefined,
      damageInflicted: isSet(object.damageInflicted) ? globalThis.Number(object.damageInflicted) : 0,
    };
  },

  toJSON(message: RevenantForgedShadowDamaged): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.attacker !== undefined) {
      obj.attacker = Player.toJSON(message.attacker);
    }
    if (message.victim !== undefined) {
      obj.victim = Player.toJSON(message.victim);
    }
    if (message.damageInflicted !== 0) {
      obj.damageInflicted = Math.round(message.damageInflicted);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevenantForgedShadowDamaged>, I>>(base?: I): RevenantForgedShadowDamaged {
    return RevenantForgedShadowDamaged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevenantForgedShadowDamaged>, I>>(object: I): RevenantForgedShadowDamaged {
    const message = createBaseRevenantForgedShadowDamaged();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.attacker = (object.attacker !== undefined && object.attacker !== null)
      ? Player.fromPartial(object.attacker)
      : undefined;
    message.victim = (object.victim !== undefined && object.victim !== null)
      ? Player.fromPartial(object.victim)
      : undefined;
    message.damageInflicted = object.damageInflicted ?? 0;
    return message;
  },
};

function createBasePlayerRespawnTeam(): PlayerRespawnTeam {
  return { timestamp: 0, category: "", player: undefined, respawned: "" };
}

export const PlayerRespawnTeam = {
  encode(message: PlayerRespawnTeam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.respawned !== "") {
      writer.uint32(34).string(message.respawned);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerRespawnTeam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerRespawnTeam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.respawned = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerRespawnTeam {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      respawned: isSet(object.respawned) ? globalThis.String(object.respawned) : "",
    };
  },

  toJSON(message: PlayerRespawnTeam): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.respawned !== "") {
      obj.respawned = message.respawned;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerRespawnTeam>, I>>(base?: I): PlayerRespawnTeam {
    return PlayerRespawnTeam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerRespawnTeam>, I>>(object: I): PlayerRespawnTeam {
    const message = createBasePlayerRespawnTeam();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.respawned = object.respawned ?? "";
    return message;
  },
};

function createBasePlayerRevive(): PlayerRevive {
  return { timestamp: 0, category: "", player: undefined, revived: undefined };
}

export const PlayerRevive = {
  encode(message: PlayerRevive, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.revived !== undefined) {
      Player.encode(message.revived, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerRevive {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerRevive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.revived = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerRevive {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      revived: isSet(object.revived) ? Player.fromJSON(object.revived) : undefined,
    };
  },

  toJSON(message: PlayerRevive): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.revived !== undefined) {
      obj.revived = Player.toJSON(message.revived);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerRevive>, I>>(base?: I): PlayerRevive {
    return PlayerRevive.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerRevive>, I>>(object: I): PlayerRevive {
    const message = createBasePlayerRevive();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.revived = (object.revived !== undefined && object.revived !== null)
      ? Player.fromPartial(object.revived)
      : undefined;
    return message;
  },
};

function createBaseArenasItemSelected(): ArenasItemSelected {
  return { timestamp: 0, category: "", player: undefined, item: "", quantity: 0 };
}

export const ArenasItemSelected = {
  encode(message: ArenasItemSelected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    if (message.quantity !== 0) {
      writer.uint32(40).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArenasItemSelected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArenasItemSelected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.quantity = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ArenasItemSelected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: ArenasItemSelected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ArenasItemSelected>, I>>(base?: I): ArenasItemSelected {
    return ArenasItemSelected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ArenasItemSelected>, I>>(object: I): ArenasItemSelected {
    const message = createBaseArenasItemSelected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseArenasItemDeselected(): ArenasItemDeselected {
  return { timestamp: 0, category: "", player: undefined, item: "", quantity: 0 };
}

export const ArenasItemDeselected = {
  encode(message: ArenasItemDeselected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    if (message.quantity !== 0) {
      writer.uint32(40).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArenasItemDeselected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArenasItemDeselected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.quantity = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ArenasItemDeselected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: ArenasItemDeselected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ArenasItemDeselected>, I>>(base?: I): ArenasItemDeselected {
    return ArenasItemDeselected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ArenasItemDeselected>, I>>(object: I): ArenasItemDeselected {
    const message = createBaseArenasItemDeselected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseInventoryPickUp(): InventoryPickUp {
  return { timestamp: 0, category: "", player: undefined, item: "", quantity: 0 };
}

export const InventoryPickUp = {
  encode(message: InventoryPickUp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    if (message.quantity !== 0) {
      writer.uint32(40).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InventoryPickUp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInventoryPickUp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.quantity = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InventoryPickUp {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: InventoryPickUp): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InventoryPickUp>, I>>(base?: I): InventoryPickUp {
    return InventoryPickUp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InventoryPickUp>, I>>(object: I): InventoryPickUp {
    const message = createBaseInventoryPickUp();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseInventoryDrop(): InventoryDrop {
  return { timestamp: 0, category: "", player: undefined, item: "", quantity: 0, extraData: [] };
}

export const InventoryDrop = {
  encode(message: InventoryDrop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    if (message.quantity !== 0) {
      writer.uint32(40).int32(message.quantity);
    }
    for (const v of message.extraData) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InventoryDrop {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInventoryDrop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.quantity = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.extraData.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InventoryDrop {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
      extraData: globalThis.Array.isArray(object?.extraData)
        ? object.extraData.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: InventoryDrop): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    if (message.extraData?.length) {
      obj.extraData = message.extraData;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InventoryDrop>, I>>(base?: I): InventoryDrop {
    return InventoryDrop.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InventoryDrop>, I>>(object: I): InventoryDrop {
    const message = createBaseInventoryDrop();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    message.quantity = object.quantity ?? 0;
    message.extraData = object.extraData?.map((e) => e) || [];
    return message;
  },
};

function createBaseInventoryUse(): InventoryUse {
  return { timestamp: 0, category: "", player: undefined, item: "", quantity: 0 };
}

export const InventoryUse = {
  encode(message: InventoryUse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    if (message.quantity !== 0) {
      writer.uint32(40).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InventoryUse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInventoryUse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.quantity = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InventoryUse {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: InventoryUse): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InventoryUse>, I>>(base?: I): InventoryUse {
    return InventoryUse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InventoryUse>, I>>(object: I): InventoryUse {
    const message = createBaseInventoryUse();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseBannerCollected(): BannerCollected {
  return { timestamp: 0, category: "", player: undefined, collected: undefined };
}

export const BannerCollected = {
  encode(message: BannerCollected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.collected !== undefined) {
      Player.encode(message.collected, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BannerCollected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBannerCollected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.collected = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BannerCollected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      collected: isSet(object.collected) ? Player.fromJSON(object.collected) : undefined,
    };
  },

  toJSON(message: BannerCollected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.collected !== undefined) {
      obj.collected = Player.toJSON(message.collected);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BannerCollected>, I>>(base?: I): BannerCollected {
    return BannerCollected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BannerCollected>, I>>(object: I): BannerCollected {
    const message = createBaseBannerCollected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.collected = (object.collected !== undefined && object.collected !== null)
      ? Player.fromPartial(object.collected)
      : undefined;
    return message;
  },
};

function createBasePlayerAbilityUsed(): PlayerAbilityUsed {
  return { timestamp: 0, category: "", player: undefined, linkedEntity: "" };
}

export const PlayerAbilityUsed = {
  encode(message: PlayerAbilityUsed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.linkedEntity !== "") {
      writer.uint32(34).string(message.linkedEntity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerAbilityUsed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerAbilityUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.linkedEntity = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayerAbilityUsed {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      linkedEntity: isSet(object.linkedEntity) ? globalThis.String(object.linkedEntity) : "",
    };
  },

  toJSON(message: PlayerAbilityUsed): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.linkedEntity !== "") {
      obj.linkedEntity = message.linkedEntity;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayerAbilityUsed>, I>>(base?: I): PlayerAbilityUsed {
    return PlayerAbilityUsed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayerAbilityUsed>, I>>(object: I): PlayerAbilityUsed {
    const message = createBasePlayerAbilityUsed();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.linkedEntity = object.linkedEntity ?? "";
    return message;
  },
};

function createBaseLegendUpgradeSelected(): LegendUpgradeSelected {
  return { timestamp: 0, category: "", player: undefined, upgradeName: "", upgradeDesc: "", level: 0 };
}

export const LegendUpgradeSelected = {
  encode(message: LegendUpgradeSelected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.upgradeName !== "") {
      writer.uint32(34).string(message.upgradeName);
    }
    if (message.upgradeDesc !== "") {
      writer.uint32(42).string(message.upgradeDesc);
    }
    if (message.level !== 0) {
      writer.uint32(48).int32(message.level);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegendUpgradeSelected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegendUpgradeSelected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.upgradeName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.upgradeDesc = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.level = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LegendUpgradeSelected {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      upgradeName: isSet(object.upgradeName) ? globalThis.String(object.upgradeName) : "",
      upgradeDesc: isSet(object.upgradeDesc) ? globalThis.String(object.upgradeDesc) : "",
      level: isSet(object.level) ? globalThis.Number(object.level) : 0,
    };
  },

  toJSON(message: LegendUpgradeSelected): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.upgradeName !== "") {
      obj.upgradeName = message.upgradeName;
    }
    if (message.upgradeDesc !== "") {
      obj.upgradeDesc = message.upgradeDesc;
    }
    if (message.level !== 0) {
      obj.level = Math.round(message.level);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LegendUpgradeSelected>, I>>(base?: I): LegendUpgradeSelected {
    return LegendUpgradeSelected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LegendUpgradeSelected>, I>>(object: I): LegendUpgradeSelected {
    const message = createBaseLegendUpgradeSelected();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.upgradeName = object.upgradeName ?? "";
    message.upgradeDesc = object.upgradeDesc ?? "";
    message.level = object.level ?? 0;
    return message;
  },
};

function createBaseZiplineUsed(): ZiplineUsed {
  return { timestamp: 0, category: "", player: undefined, linkedEntity: "" };
}

export const ZiplineUsed = {
  encode(message: ZiplineUsed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.linkedEntity !== "") {
      writer.uint32(34).string(message.linkedEntity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ZiplineUsed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseZiplineUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.linkedEntity = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ZiplineUsed {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      linkedEntity: isSet(object.linkedEntity) ? globalThis.String(object.linkedEntity) : "",
    };
  },

  toJSON(message: ZiplineUsed): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.linkedEntity !== "") {
      obj.linkedEntity = message.linkedEntity;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ZiplineUsed>, I>>(base?: I): ZiplineUsed {
    return ZiplineUsed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ZiplineUsed>, I>>(object: I): ZiplineUsed {
    const message = createBaseZiplineUsed();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.linkedEntity = object.linkedEntity ?? "";
    return message;
  },
};

function createBaseGrenadeThrown(): GrenadeThrown {
  return { timestamp: 0, category: "", player: undefined, linkedEntity: "" };
}

export const GrenadeThrown = {
  encode(message: GrenadeThrown, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.linkedEntity !== "") {
      writer.uint32(34).string(message.linkedEntity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrenadeThrown {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrenadeThrown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.linkedEntity = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GrenadeThrown {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      linkedEntity: isSet(object.linkedEntity) ? globalThis.String(object.linkedEntity) : "",
    };
  },

  toJSON(message: GrenadeThrown): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.linkedEntity !== "") {
      obj.linkedEntity = message.linkedEntity;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GrenadeThrown>, I>>(base?: I): GrenadeThrown {
    return GrenadeThrown.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GrenadeThrown>, I>>(object: I): GrenadeThrown {
    const message = createBaseGrenadeThrown();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.linkedEntity = object.linkedEntity ?? "";
    return message;
  },
};

function createBaseBlackMarketAction(): BlackMarketAction {
  return { timestamp: 0, category: "", player: undefined, item: "" };
}

export const BlackMarketAction = {
  encode(message: BlackMarketAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== "") {
      writer.uint32(34).string(message.item);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlackMarketAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlackMarketAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlackMarketAction {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      item: isSet(object.item) ? globalThis.String(object.item) : "",
    };
  },

  toJSON(message: BlackMarketAction): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.item !== "") {
      obj.item = message.item;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlackMarketAction>, I>>(base?: I): BlackMarketAction {
    return BlackMarketAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlackMarketAction>, I>>(object: I): BlackMarketAction {
    const message = createBaseBlackMarketAction();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.item = object.item ?? "";
    return message;
  },
};

function createBaseWraithPortal(): WraithPortal {
  return { timestamp: 0, category: "", player: undefined };
}

export const WraithPortal = {
  encode(message: WraithPortal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WraithPortal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWraithPortal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WraithPortal {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
    };
  },

  toJSON(message: WraithPortal): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WraithPortal>, I>>(base?: I): WraithPortal {
    return WraithPortal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WraithPortal>, I>>(object: I): WraithPortal {
    const message = createBaseWraithPortal();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    return message;
  },
};

function createBaseWarpGateUsed(): WarpGateUsed {
  return { timestamp: 0, category: "", player: undefined };
}

export const WarpGateUsed = {
  encode(message: WarpGateUsed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WarpGateUsed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWarpGateUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WarpGateUsed {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
    };
  },

  toJSON(message: WarpGateUsed): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WarpGateUsed>, I>>(base?: I): WarpGateUsed {
    return WarpGateUsed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WarpGateUsed>, I>>(object: I): WarpGateUsed {
    const message = createBaseWarpGateUsed();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    return message;
  },
};

function createBaseAmmoUsed(): AmmoUsed {
  return {
    timestamp: 0,
    category: "",
    player: undefined,
    ammoType: "",
    amountUsed: 0,
    oldAmmoCount: 0,
    newAmmoCount: 0,
  };
}

export const AmmoUsed = {
  encode(message: AmmoUsed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.ammoType !== "") {
      writer.uint32(34).string(message.ammoType);
    }
    if (message.amountUsed !== 0) {
      writer.uint32(40).uint32(message.amountUsed);
    }
    if (message.oldAmmoCount !== 0) {
      writer.uint32(48).uint32(message.oldAmmoCount);
    }
    if (message.newAmmoCount !== 0) {
      writer.uint32(56).uint32(message.newAmmoCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AmmoUsed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAmmoUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.ammoType = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.amountUsed = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.oldAmmoCount = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.newAmmoCount = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AmmoUsed {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      ammoType: isSet(object.ammoType) ? globalThis.String(object.ammoType) : "",
      amountUsed: isSet(object.amountUsed) ? globalThis.Number(object.amountUsed) : 0,
      oldAmmoCount: isSet(object.oldAmmoCount) ? globalThis.Number(object.oldAmmoCount) : 0,
      newAmmoCount: isSet(object.newAmmoCount) ? globalThis.Number(object.newAmmoCount) : 0,
    };
  },

  toJSON(message: AmmoUsed): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.ammoType !== "") {
      obj.ammoType = message.ammoType;
    }
    if (message.amountUsed !== 0) {
      obj.amountUsed = Math.round(message.amountUsed);
    }
    if (message.oldAmmoCount !== 0) {
      obj.oldAmmoCount = Math.round(message.oldAmmoCount);
    }
    if (message.newAmmoCount !== 0) {
      obj.newAmmoCount = Math.round(message.newAmmoCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AmmoUsed>, I>>(base?: I): AmmoUsed {
    return AmmoUsed.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AmmoUsed>, I>>(object: I): AmmoUsed {
    const message = createBaseAmmoUsed();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.ammoType = object.ammoType ?? "";
    message.amountUsed = object.amountUsed ?? 0;
    message.oldAmmoCount = object.oldAmmoCount ?? 0;
    message.newAmmoCount = object.newAmmoCount ?? 0;
    return message;
  },
};

function createBaseWeaponSwitched(): WeaponSwitched {
  return { timestamp: 0, category: "", player: undefined, oldWeapon: "", newWeapon: "" };
}

export const WeaponSwitched = {
  encode(message: WeaponSwitched, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    if (message.oldWeapon !== "") {
      writer.uint32(34).string(message.oldWeapon);
    }
    if (message.newWeapon !== "") {
      writer.uint32(42).string(message.newWeapon);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeaponSwitched {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeaponSwitched();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.oldWeapon = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.newWeapon = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WeaponSwitched {
    return {
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      oldWeapon: isSet(object.oldWeapon) ? globalThis.String(object.oldWeapon) : "",
      newWeapon: isSet(object.newWeapon) ? globalThis.String(object.newWeapon) : "",
    };
  },

  toJSON(message: WeaponSwitched): unknown {
    const obj: any = {};
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.oldWeapon !== "") {
      obj.oldWeapon = message.oldWeapon;
    }
    if (message.newWeapon !== "") {
      obj.newWeapon = message.newWeapon;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WeaponSwitched>, I>>(base?: I): WeaponSwitched {
    return WeaponSwitched.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WeaponSwitched>, I>>(object: I): WeaponSwitched {
    const message = createBaseWeaponSwitched();
    message.timestamp = object.timestamp ?? 0;
    message.category = object.category ?? "";
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.oldWeapon = object.oldWeapon ?? "";
    message.newWeapon = object.newWeapon ?? "";
    return message;
  },
};

function createBaseChangeCamera(): ChangeCamera {
  return { poi: undefined, name: undefined };
}

export const ChangeCamera = {
  encode(message: ChangeCamera, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poi !== undefined) {
      writer.uint32(8).int32(message.poi);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeCamera {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeCamera();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poi = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeCamera {
    return {
      poi: isSet(object.poi) ? playerOfInterestFromJSON(object.poi) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
    };
  },

  toJSON(message: ChangeCamera): unknown {
    const obj: any = {};
    if (message.poi !== undefined) {
      obj.poi = playerOfInterestToJSON(message.poi);
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeCamera>, I>>(base?: I): ChangeCamera {
    return ChangeCamera.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeCamera>, I>>(object: I): ChangeCamera {
    const message = createBaseChangeCamera();
    message.poi = object.poi ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBasePauseToggle(): PauseToggle {
  return { preTimer: 0 };
}

export const PauseToggle = {
  encode(message: PauseToggle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.preTimer !== 0) {
      writer.uint32(13).float(message.preTimer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PauseToggle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseToggle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.preTimer = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PauseToggle {
    return { preTimer: isSet(object.preTimer) ? globalThis.Number(object.preTimer) : 0 };
  },

  toJSON(message: PauseToggle): unknown {
    const obj: any = {};
    if (message.preTimer !== 0) {
      obj.preTimer = message.preTimer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PauseToggle>, I>>(base?: I): PauseToggle {
    return PauseToggle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PauseToggle>, I>>(object: I): PauseToggle {
    const message = createBasePauseToggle();
    message.preTimer = object.preTimer ?? 0;
    return message;
  },
};

function createBaseCustomMatchCreateLobby(): CustomMatchCreateLobby {
  return {};
}

export const CustomMatchCreateLobby = {
  encode(_: CustomMatchCreateLobby, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchCreateLobby {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchCreateLobby();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CustomMatchCreateLobby {
    return {};
  },

  toJSON(_: CustomMatchCreateLobby): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchCreateLobby>, I>>(base?: I): CustomMatchCreateLobby {
    return CustomMatchCreateLobby.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchCreateLobby>, I>>(_: I): CustomMatchCreateLobby {
    const message = createBaseCustomMatchCreateLobby();
    return message;
  },
};

function createBaseCustomMatchJoinLobby(): CustomMatchJoinLobby {
  return { roleToken: "" };
}

export const CustomMatchJoinLobby = {
  encode(message: CustomMatchJoinLobby, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roleToken !== "") {
      writer.uint32(10).string(message.roleToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchJoinLobby {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchJoinLobby();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.roleToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchJoinLobby {
    return { roleToken: isSet(object.roleToken) ? globalThis.String(object.roleToken) : "" };
  },

  toJSON(message: CustomMatchJoinLobby): unknown {
    const obj: any = {};
    if (message.roleToken !== "") {
      obj.roleToken = message.roleToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchJoinLobby>, I>>(base?: I): CustomMatchJoinLobby {
    return CustomMatchJoinLobby.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchJoinLobby>, I>>(object: I): CustomMatchJoinLobby {
    const message = createBaseCustomMatchJoinLobby();
    message.roleToken = object.roleToken ?? "";
    return message;
  },
};

function createBaseCustomMatchLeaveLobby(): CustomMatchLeaveLobby {
  return {};
}

export const CustomMatchLeaveLobby = {
  encode(_: CustomMatchLeaveLobby, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchLeaveLobby {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchLeaveLobby();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CustomMatchLeaveLobby {
    return {};
  },

  toJSON(_: CustomMatchLeaveLobby): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchLeaveLobby>, I>>(base?: I): CustomMatchLeaveLobby {
    return CustomMatchLeaveLobby.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchLeaveLobby>, I>>(_: I): CustomMatchLeaveLobby {
    const message = createBaseCustomMatchLeaveLobby();
    return message;
  },
};

function createBaseCustomMatchSetReady(): CustomMatchSetReady {
  return { isReady: false };
}

export const CustomMatchSetReady = {
  encode(message: CustomMatchSetReady, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isReady !== false) {
      writer.uint32(8).bool(message.isReady);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSetReady {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSetReady();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isReady = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSetReady {
    return { isReady: isSet(object.isReady) ? globalThis.Boolean(object.isReady) : false };
  },

  toJSON(message: CustomMatchSetReady): unknown {
    const obj: any = {};
    if (message.isReady !== false) {
      obj.isReady = message.isReady;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSetReady>, I>>(base?: I): CustomMatchSetReady {
    return CustomMatchSetReady.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSetReady>, I>>(object: I): CustomMatchSetReady {
    const message = createBaseCustomMatchSetReady();
    message.isReady = object.isReady ?? false;
    return message;
  },
};

function createBaseCustomMatchGetLobbyPlayers(): CustomMatchGetLobbyPlayers {
  return {};
}

export const CustomMatchGetLobbyPlayers = {
  encode(_: CustomMatchGetLobbyPlayers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchGetLobbyPlayers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchGetLobbyPlayers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CustomMatchGetLobbyPlayers {
    return {};
  },

  toJSON(_: CustomMatchGetLobbyPlayers): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchGetLobbyPlayers>, I>>(base?: I): CustomMatchGetLobbyPlayers {
    return CustomMatchGetLobbyPlayers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchGetLobbyPlayers>, I>>(_: I): CustomMatchGetLobbyPlayers {
    const message = createBaseCustomMatchGetLobbyPlayers();
    return message;
  },
};

function createBaseCustomMatchSetMatchmaking(): CustomMatchSetMatchmaking {
  return { enabled: false };
}

export const CustomMatchSetMatchmaking = {
  encode(message: CustomMatchSetMatchmaking, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled !== false) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSetMatchmaking {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSetMatchmaking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSetMatchmaking {
    return { enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false };
  },

  toJSON(message: CustomMatchSetMatchmaking): unknown {
    const obj: any = {};
    if (message.enabled !== false) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSetMatchmaking>, I>>(base?: I): CustomMatchSetMatchmaking {
    return CustomMatchSetMatchmaking.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSetMatchmaking>, I>>(object: I): CustomMatchSetMatchmaking {
    const message = createBaseCustomMatchSetMatchmaking();
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseCustomMatchSetTeam(): CustomMatchSetTeam {
  return { teamId: 0, targetHardwareName: "", targetNucleusHash: "" };
}

export const CustomMatchSetTeam = {
  encode(message: CustomMatchSetTeam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.teamId !== 0) {
      writer.uint32(8).int32(message.teamId);
    }
    if (message.targetHardwareName !== "") {
      writer.uint32(18).string(message.targetHardwareName);
    }
    if (message.targetNucleusHash !== "") {
      writer.uint32(26).string(message.targetNucleusHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSetTeam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSetTeam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.teamId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.targetHardwareName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.targetNucleusHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSetTeam {
    return {
      teamId: isSet(object.teamId) ? globalThis.Number(object.teamId) : 0,
      targetHardwareName: isSet(object.targetHardwareName) ? globalThis.String(object.targetHardwareName) : "",
      targetNucleusHash: isSet(object.targetNucleusHash) ? globalThis.String(object.targetNucleusHash) : "",
    };
  },

  toJSON(message: CustomMatchSetTeam): unknown {
    const obj: any = {};
    if (message.teamId !== 0) {
      obj.teamId = Math.round(message.teamId);
    }
    if (message.targetHardwareName !== "") {
      obj.targetHardwareName = message.targetHardwareName;
    }
    if (message.targetNucleusHash !== "") {
      obj.targetNucleusHash = message.targetNucleusHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSetTeam>, I>>(base?: I): CustomMatchSetTeam {
    return CustomMatchSetTeam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSetTeam>, I>>(object: I): CustomMatchSetTeam {
    const message = createBaseCustomMatchSetTeam();
    message.teamId = object.teamId ?? 0;
    message.targetHardwareName = object.targetHardwareName ?? "";
    message.targetNucleusHash = object.targetNucleusHash ?? "";
    return message;
  },
};

function createBaseCustomMatchKickPlayer(): CustomMatchKickPlayer {
  return { targetHardwareName: "", targetNucleusHash: "" };
}

export const CustomMatchKickPlayer = {
  encode(message: CustomMatchKickPlayer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.targetHardwareName !== "") {
      writer.uint32(10).string(message.targetHardwareName);
    }
    if (message.targetNucleusHash !== "") {
      writer.uint32(18).string(message.targetNucleusHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchKickPlayer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchKickPlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.targetHardwareName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.targetNucleusHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchKickPlayer {
    return {
      targetHardwareName: isSet(object.targetHardwareName) ? globalThis.String(object.targetHardwareName) : "",
      targetNucleusHash: isSet(object.targetNucleusHash) ? globalThis.String(object.targetNucleusHash) : "",
    };
  },

  toJSON(message: CustomMatchKickPlayer): unknown {
    const obj: any = {};
    if (message.targetHardwareName !== "") {
      obj.targetHardwareName = message.targetHardwareName;
    }
    if (message.targetNucleusHash !== "") {
      obj.targetNucleusHash = message.targetNucleusHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchKickPlayer>, I>>(base?: I): CustomMatchKickPlayer {
    return CustomMatchKickPlayer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchKickPlayer>, I>>(object: I): CustomMatchKickPlayer {
    const message = createBaseCustomMatchKickPlayer();
    message.targetHardwareName = object.targetHardwareName ?? "";
    message.targetNucleusHash = object.targetNucleusHash ?? "";
    return message;
  },
};

function createBaseCustomMatchSetSettings(): CustomMatchSetSettings {
  return {
    playlistName: "",
    adminChat: false,
    teamRename: false,
    selfAssign: false,
    aimAssist: false,
    anonMode: false,
  };
}

export const CustomMatchSetSettings = {
  encode(message: CustomMatchSetSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playlistName !== "") {
      writer.uint32(10).string(message.playlistName);
    }
    if (message.adminChat !== false) {
      writer.uint32(16).bool(message.adminChat);
    }
    if (message.teamRename !== false) {
      writer.uint32(24).bool(message.teamRename);
    }
    if (message.selfAssign !== false) {
      writer.uint32(32).bool(message.selfAssign);
    }
    if (message.aimAssist !== false) {
      writer.uint32(40).bool(message.aimAssist);
    }
    if (message.anonMode !== false) {
      writer.uint32(48).bool(message.anonMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSetSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSetSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.playlistName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.adminChat = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.teamRename = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.selfAssign = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.aimAssist = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.anonMode = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSetSettings {
    return {
      playlistName: isSet(object.playlistName) ? globalThis.String(object.playlistName) : "",
      adminChat: isSet(object.adminChat) ? globalThis.Boolean(object.adminChat) : false,
      teamRename: isSet(object.teamRename) ? globalThis.Boolean(object.teamRename) : false,
      selfAssign: isSet(object.selfAssign) ? globalThis.Boolean(object.selfAssign) : false,
      aimAssist: isSet(object.aimAssist) ? globalThis.Boolean(object.aimAssist) : false,
      anonMode: isSet(object.anonMode) ? globalThis.Boolean(object.anonMode) : false,
    };
  },

  toJSON(message: CustomMatchSetSettings): unknown {
    const obj: any = {};
    if (message.playlistName !== "") {
      obj.playlistName = message.playlistName;
    }
    if (message.adminChat !== false) {
      obj.adminChat = message.adminChat;
    }
    if (message.teamRename !== false) {
      obj.teamRename = message.teamRename;
    }
    if (message.selfAssign !== false) {
      obj.selfAssign = message.selfAssign;
    }
    if (message.aimAssist !== false) {
      obj.aimAssist = message.aimAssist;
    }
    if (message.anonMode !== false) {
      obj.anonMode = message.anonMode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSetSettings>, I>>(base?: I): CustomMatchSetSettings {
    return CustomMatchSetSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSetSettings>, I>>(object: I): CustomMatchSetSettings {
    const message = createBaseCustomMatchSetSettings();
    message.playlistName = object.playlistName ?? "";
    message.adminChat = object.adminChat ?? false;
    message.teamRename = object.teamRename ?? false;
    message.selfAssign = object.selfAssign ?? false;
    message.aimAssist = object.aimAssist ?? false;
    message.anonMode = object.anonMode ?? false;
    return message;
  },
};

function createBaseCustomMatchGetSettings(): CustomMatchGetSettings {
  return {};
}

export const CustomMatchGetSettings = {
  encode(_: CustomMatchGetSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchGetSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchGetSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CustomMatchGetSettings {
    return {};
  },

  toJSON(_: CustomMatchGetSettings): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchGetSettings>, I>>(base?: I): CustomMatchGetSettings {
    return CustomMatchGetSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchGetSettings>, I>>(_: I): CustomMatchGetSettings {
    const message = createBaseCustomMatchGetSettings();
    return message;
  },
};

function createBaseCustomMatchSetTeamName(): CustomMatchSetTeamName {
  return { teamId: 0, teamName: "" };
}

export const CustomMatchSetTeamName = {
  encode(message: CustomMatchSetTeamName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.teamId !== 0) {
      writer.uint32(8).int32(message.teamId);
    }
    if (message.teamName !== "") {
      writer.uint32(18).string(message.teamName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSetTeamName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSetTeamName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.teamId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.teamName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSetTeamName {
    return {
      teamId: isSet(object.teamId) ? globalThis.Number(object.teamId) : 0,
      teamName: isSet(object.teamName) ? globalThis.String(object.teamName) : "",
    };
  },

  toJSON(message: CustomMatchSetTeamName): unknown {
    const obj: any = {};
    if (message.teamId !== 0) {
      obj.teamId = Math.round(message.teamId);
    }
    if (message.teamName !== "") {
      obj.teamName = message.teamName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSetTeamName>, I>>(base?: I): CustomMatchSetTeamName {
    return CustomMatchSetTeamName.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSetTeamName>, I>>(object: I): CustomMatchSetTeamName {
    const message = createBaseCustomMatchSetTeamName();
    message.teamId = object.teamId ?? 0;
    message.teamName = object.teamName ?? "";
    return message;
  },
};

function createBaseCustomMatchSendChat(): CustomMatchSendChat {
  return { text: "" };
}

export const CustomMatchSendChat = {
  encode(message: CustomMatchSendChat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomMatchSendChat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomMatchSendChat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomMatchSendChat {
    return { text: isSet(object.text) ? globalThis.String(object.text) : "" };
  },

  toJSON(message: CustomMatchSendChat): unknown {
    const obj: any = {};
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomMatchSendChat>, I>>(base?: I): CustomMatchSendChat {
    return CustomMatchSendChat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomMatchSendChat>, I>>(object: I): CustomMatchSendChat {
    const message = createBaseCustomMatchSendChat();
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseRequest(): Request {
  return {
    withAck: false,
    preSharedKey: "",
    changeCam: undefined,
    pauseToggle: undefined,
    customMatchCreateLobby: undefined,
    customMatchJoinLobby: undefined,
    customMatchLeaveLobby: undefined,
    customMatchSetReady: undefined,
    customMatchSetMatchmaking: undefined,
    customMatchSetTeam: undefined,
    customMatchKickPlayer: undefined,
    customMatchSetSettings: undefined,
    customMatchSendChat: undefined,
    customMatchGetLobbyPlayers: undefined,
    customMatchSetTeamName: undefined,
    customMatchGetSettings: undefined,
  };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.withAck !== false) {
      writer.uint32(8).bool(message.withAck);
    }
    if (message.preSharedKey !== "") {
      writer.uint32(18).string(message.preSharedKey);
    }
    if (message.changeCam !== undefined) {
      ChangeCamera.encode(message.changeCam, writer.uint32(34).fork()).ldelim();
    }
    if (message.pauseToggle !== undefined) {
      PauseToggle.encode(message.pauseToggle, writer.uint32(42).fork()).ldelim();
    }
    if (message.customMatchCreateLobby !== undefined) {
      CustomMatchCreateLobby.encode(message.customMatchCreateLobby, writer.uint32(82).fork()).ldelim();
    }
    if (message.customMatchJoinLobby !== undefined) {
      CustomMatchJoinLobby.encode(message.customMatchJoinLobby, writer.uint32(90).fork()).ldelim();
    }
    if (message.customMatchLeaveLobby !== undefined) {
      CustomMatchLeaveLobby.encode(message.customMatchLeaveLobby, writer.uint32(98).fork()).ldelim();
    }
    if (message.customMatchSetReady !== undefined) {
      CustomMatchSetReady.encode(message.customMatchSetReady, writer.uint32(106).fork()).ldelim();
    }
    if (message.customMatchSetMatchmaking !== undefined) {
      CustomMatchSetMatchmaking.encode(message.customMatchSetMatchmaking, writer.uint32(114).fork()).ldelim();
    }
    if (message.customMatchSetTeam !== undefined) {
      CustomMatchSetTeam.encode(message.customMatchSetTeam, writer.uint32(122).fork()).ldelim();
    }
    if (message.customMatchKickPlayer !== undefined) {
      CustomMatchKickPlayer.encode(message.customMatchKickPlayer, writer.uint32(130).fork()).ldelim();
    }
    if (message.customMatchSetSettings !== undefined) {
      CustomMatchSetSettings.encode(message.customMatchSetSettings, writer.uint32(138).fork()).ldelim();
    }
    if (message.customMatchSendChat !== undefined) {
      CustomMatchSendChat.encode(message.customMatchSendChat, writer.uint32(146).fork()).ldelim();
    }
    if (message.customMatchGetLobbyPlayers !== undefined) {
      CustomMatchGetLobbyPlayers.encode(message.customMatchGetLobbyPlayers, writer.uint32(154).fork()).ldelim();
    }
    if (message.customMatchSetTeamName !== undefined) {
      CustomMatchSetTeamName.encode(message.customMatchSetTeamName, writer.uint32(162).fork()).ldelim();
    }
    if (message.customMatchGetSettings !== undefined) {
      CustomMatchGetSettings.encode(message.customMatchGetSettings, writer.uint32(170).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.withAck = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.preSharedKey = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.changeCam = ChangeCamera.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.pauseToggle = PauseToggle.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.customMatchCreateLobby = CustomMatchCreateLobby.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.customMatchJoinLobby = CustomMatchJoinLobby.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.customMatchLeaveLobby = CustomMatchLeaveLobby.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.customMatchSetReady = CustomMatchSetReady.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.customMatchSetMatchmaking = CustomMatchSetMatchmaking.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.customMatchSetTeam = CustomMatchSetTeam.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.customMatchKickPlayer = CustomMatchKickPlayer.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.customMatchSetSettings = CustomMatchSetSettings.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.customMatchSendChat = CustomMatchSendChat.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.customMatchGetLobbyPlayers = CustomMatchGetLobbyPlayers.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.customMatchSetTeamName = CustomMatchSetTeamName.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.customMatchGetSettings = CustomMatchGetSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      withAck: isSet(object.withAck) ? globalThis.Boolean(object.withAck) : false,
      preSharedKey: isSet(object.preSharedKey) ? globalThis.String(object.preSharedKey) : "",
      changeCam: isSet(object.changeCam) ? ChangeCamera.fromJSON(object.changeCam) : undefined,
      pauseToggle: isSet(object.pauseToggle) ? PauseToggle.fromJSON(object.pauseToggle) : undefined,
      customMatchCreateLobby: isSet(object.customMatchCreateLobby)
        ? CustomMatchCreateLobby.fromJSON(object.customMatchCreateLobby)
        : undefined,
      customMatchJoinLobby: isSet(object.customMatchJoinLobby)
        ? CustomMatchJoinLobby.fromJSON(object.customMatchJoinLobby)
        : undefined,
      customMatchLeaveLobby: isSet(object.customMatchLeaveLobby)
        ? CustomMatchLeaveLobby.fromJSON(object.customMatchLeaveLobby)
        : undefined,
      customMatchSetReady: isSet(object.customMatchSetReady)
        ? CustomMatchSetReady.fromJSON(object.customMatchSetReady)
        : undefined,
      customMatchSetMatchmaking: isSet(object.customMatchSetMatchmaking)
        ? CustomMatchSetMatchmaking.fromJSON(object.customMatchSetMatchmaking)
        : undefined,
      customMatchSetTeam: isSet(object.customMatchSetTeam)
        ? CustomMatchSetTeam.fromJSON(object.customMatchSetTeam)
        : undefined,
      customMatchKickPlayer: isSet(object.customMatchKickPlayer)
        ? CustomMatchKickPlayer.fromJSON(object.customMatchKickPlayer)
        : undefined,
      customMatchSetSettings: isSet(object.customMatchSetSettings)
        ? CustomMatchSetSettings.fromJSON(object.customMatchSetSettings)
        : undefined,
      customMatchSendChat: isSet(object.customMatchSendChat)
        ? CustomMatchSendChat.fromJSON(object.customMatchSendChat)
        : undefined,
      customMatchGetLobbyPlayers: isSet(object.customMatchGetLobbyPlayers)
        ? CustomMatchGetLobbyPlayers.fromJSON(object.customMatchGetLobbyPlayers)
        : undefined,
      customMatchSetTeamName: isSet(object.customMatchSetTeamName)
        ? CustomMatchSetTeamName.fromJSON(object.customMatchSetTeamName)
        : undefined,
      customMatchGetSettings: isSet(object.customMatchGetSettings)
        ? CustomMatchGetSettings.fromJSON(object.customMatchGetSettings)
        : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    if (message.withAck !== false) {
      obj.withAck = message.withAck;
    }
    if (message.preSharedKey !== "") {
      obj.preSharedKey = message.preSharedKey;
    }
    if (message.changeCam !== undefined) {
      obj.changeCam = ChangeCamera.toJSON(message.changeCam);
    }
    if (message.pauseToggle !== undefined) {
      obj.pauseToggle = PauseToggle.toJSON(message.pauseToggle);
    }
    if (message.customMatchCreateLobby !== undefined) {
      obj.customMatchCreateLobby = CustomMatchCreateLobby.toJSON(message.customMatchCreateLobby);
    }
    if (message.customMatchJoinLobby !== undefined) {
      obj.customMatchJoinLobby = CustomMatchJoinLobby.toJSON(message.customMatchJoinLobby);
    }
    if (message.customMatchLeaveLobby !== undefined) {
      obj.customMatchLeaveLobby = CustomMatchLeaveLobby.toJSON(message.customMatchLeaveLobby);
    }
    if (message.customMatchSetReady !== undefined) {
      obj.customMatchSetReady = CustomMatchSetReady.toJSON(message.customMatchSetReady);
    }
    if (message.customMatchSetMatchmaking !== undefined) {
      obj.customMatchSetMatchmaking = CustomMatchSetMatchmaking.toJSON(message.customMatchSetMatchmaking);
    }
    if (message.customMatchSetTeam !== undefined) {
      obj.customMatchSetTeam = CustomMatchSetTeam.toJSON(message.customMatchSetTeam);
    }
    if (message.customMatchKickPlayer !== undefined) {
      obj.customMatchKickPlayer = CustomMatchKickPlayer.toJSON(message.customMatchKickPlayer);
    }
    if (message.customMatchSetSettings !== undefined) {
      obj.customMatchSetSettings = CustomMatchSetSettings.toJSON(message.customMatchSetSettings);
    }
    if (message.customMatchSendChat !== undefined) {
      obj.customMatchSendChat = CustomMatchSendChat.toJSON(message.customMatchSendChat);
    }
    if (message.customMatchGetLobbyPlayers !== undefined) {
      obj.customMatchGetLobbyPlayers = CustomMatchGetLobbyPlayers.toJSON(message.customMatchGetLobbyPlayers);
    }
    if (message.customMatchSetTeamName !== undefined) {
      obj.customMatchSetTeamName = CustomMatchSetTeamName.toJSON(message.customMatchSetTeamName);
    }
    if (message.customMatchGetSettings !== undefined) {
      obj.customMatchGetSettings = CustomMatchGetSettings.toJSON(message.customMatchGetSettings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Request>, I>>(base?: I): Request {
    return Request.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.withAck = object.withAck ?? false;
    message.preSharedKey = object.preSharedKey ?? "";
    message.changeCam = (object.changeCam !== undefined && object.changeCam !== null)
      ? ChangeCamera.fromPartial(object.changeCam)
      : undefined;
    message.pauseToggle = (object.pauseToggle !== undefined && object.pauseToggle !== null)
      ? PauseToggle.fromPartial(object.pauseToggle)
      : undefined;
    message.customMatchCreateLobby =
      (object.customMatchCreateLobby !== undefined && object.customMatchCreateLobby !== null)
        ? CustomMatchCreateLobby.fromPartial(object.customMatchCreateLobby)
        : undefined;
    message.customMatchJoinLobby = (object.customMatchJoinLobby !== undefined && object.customMatchJoinLobby !== null)
      ? CustomMatchJoinLobby.fromPartial(object.customMatchJoinLobby)
      : undefined;
    message.customMatchLeaveLobby =
      (object.customMatchLeaveLobby !== undefined && object.customMatchLeaveLobby !== null)
        ? CustomMatchLeaveLobby.fromPartial(object.customMatchLeaveLobby)
        : undefined;
    message.customMatchSetReady = (object.customMatchSetReady !== undefined && object.customMatchSetReady !== null)
      ? CustomMatchSetReady.fromPartial(object.customMatchSetReady)
      : undefined;
    message.customMatchSetMatchmaking =
      (object.customMatchSetMatchmaking !== undefined && object.customMatchSetMatchmaking !== null)
        ? CustomMatchSetMatchmaking.fromPartial(object.customMatchSetMatchmaking)
        : undefined;
    message.customMatchSetTeam = (object.customMatchSetTeam !== undefined && object.customMatchSetTeam !== null)
      ? CustomMatchSetTeam.fromPartial(object.customMatchSetTeam)
      : undefined;
    message.customMatchKickPlayer =
      (object.customMatchKickPlayer !== undefined && object.customMatchKickPlayer !== null)
        ? CustomMatchKickPlayer.fromPartial(object.customMatchKickPlayer)
        : undefined;
    message.customMatchSetSettings =
      (object.customMatchSetSettings !== undefined && object.customMatchSetSettings !== null)
        ? CustomMatchSetSettings.fromPartial(object.customMatchSetSettings)
        : undefined;
    message.customMatchSendChat = (object.customMatchSendChat !== undefined && object.customMatchSendChat !== null)
      ? CustomMatchSendChat.fromPartial(object.customMatchSendChat)
      : undefined;
    message.customMatchGetLobbyPlayers =
      (object.customMatchGetLobbyPlayers !== undefined && object.customMatchGetLobbyPlayers !== null)
        ? CustomMatchGetLobbyPlayers.fromPartial(object.customMatchGetLobbyPlayers)
        : undefined;
    message.customMatchSetTeamName =
      (object.customMatchSetTeamName !== undefined && object.customMatchSetTeamName !== null)
        ? CustomMatchSetTeamName.fromPartial(object.customMatchSetTeamName)
        : undefined;
    message.customMatchGetSettings =
      (object.customMatchGetSettings !== undefined && object.customMatchGetSettings !== null)
        ? CustomMatchGetSettings.fromPartial(object.customMatchGetSettings)
        : undefined;
    return message;
  },
};

function createBaseRequestStatus(): RequestStatus {
  return { status: "" };
}

export const RequestStatus = {
  encode(message: RequestStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestStatus {
    return { status: isSet(object.status) ? globalThis.String(object.status) : "" };
  },

  toJSON(message: RequestStatus): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestStatus>, I>>(base?: I): RequestStatus {
    return RequestStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestStatus>, I>>(object: I): RequestStatus {
    const message = createBaseRequestStatus();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseResponse(): Response {
  return { success: false, result: undefined };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.result !== undefined) {
      obj.result = Any.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Response>, I>>(base?: I): Response {
    return Response.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.success = object.success ?? false;
    message.result = (object.result !== undefined && object.result !== null)
      ? Any.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseLiveAPIEvent(): LiveAPIEvent {
  return { eventSize: 0, gameMessage: undefined };
}

export const LiveAPIEvent = {
  encode(message: LiveAPIEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventSize !== 0) {
      writer.uint32(13).fixed32(message.eventSize);
    }
    if (message.gameMessage !== undefined) {
      Any.encode(message.gameMessage, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiveAPIEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiveAPIEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.eventSize = reader.fixed32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gameMessage = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiveAPIEvent {
    return {
      eventSize: isSet(object.eventSize) ? globalThis.Number(object.eventSize) : 0,
      gameMessage: isSet(object.gameMessage) ? Any.fromJSON(object.gameMessage) : undefined,
    };
  },

  toJSON(message: LiveAPIEvent): unknown {
    const obj: any = {};
    if (message.eventSize !== 0) {
      obj.eventSize = Math.round(message.eventSize);
    }
    if (message.gameMessage !== undefined) {
      obj.gameMessage = Any.toJSON(message.gameMessage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiveAPIEvent>, I>>(base?: I): LiveAPIEvent {
    return LiveAPIEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiveAPIEvent>, I>>(object: I): LiveAPIEvent {
    const message = createBaseLiveAPIEvent();
    message.eventSize = object.eventSize ?? 0;
    message.gameMessage = (object.gameMessage !== undefined && object.gameMessage !== null)
      ? Any.fromPartial(object.gameMessage)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
