/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.sync = (function() {

    /**
     * Namespace sync.
     * @exports sync
     * @namespace
     */
    var sync = {};

    sync.Sync = (function() {

        /**
         * Properties of a Sync.
         * @memberof sync
         * @interface ISync
         * @property {sync.IRichLogootSOperationMsg} [richLogootSOpMsg] Sync richLogootSOpMsg
         * @property {sync.IQuerySync} [querySync] Sync querySync
         * @property {sync.IReplySync} [replySync] Sync replySync
         */

        /**
         * Constructs a new Sync.
         * @memberof sync
         * @classdesc Represents a Sync.
         * @constructor
         * @param {sync.ISync=} [properties] Properties to set
         */
        function Sync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Sync richLogootSOpMsg.
         * @member {(sync.IRichLogootSOperationMsg|null|undefined)}richLogootSOpMsg
         * @memberof sync.Sync
         * @instance
         */
        Sync.prototype.richLogootSOpMsg = null;

        /**
         * Sync querySync.
         * @member {(sync.IQuerySync|null|undefined)}querySync
         * @memberof sync.Sync
         * @instance
         */
        Sync.prototype.querySync = null;

        /**
         * Sync replySync.
         * @member {(sync.IReplySync|null|undefined)}replySync
         * @memberof sync.Sync
         * @instance
         */
        Sync.prototype.replySync = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Sync type.
         * @member {string|undefined} type
         * @memberof sync.Sync
         * @instance
         */
        Object.defineProperty(Sync.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["richLogootSOpMsg", "querySync", "replySync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Sync instance using the specified properties.
         * @function create
         * @memberof sync.Sync
         * @static
         * @param {sync.ISync=} [properties] Properties to set
         * @returns {sync.Sync} Sync instance
         */
        Sync.create = function create(properties) {
            return new Sync(properties);
        };

        /**
         * Encodes the specified Sync message. Does not implicitly {@link sync.Sync.verify|verify} messages.
         * @function encode
         * @memberof sync.Sync
         * @static
         * @param {sync.ISync} message Sync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Sync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.richLogootSOpMsg != null && message.hasOwnProperty("richLogootSOpMsg"))
                $root.sync.RichLogootSOperationMsg.encode(message.richLogootSOpMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.querySync != null && message.hasOwnProperty("querySync"))
                $root.sync.QuerySync.encode(message.querySync, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.replySync != null && message.hasOwnProperty("replySync"))
                $root.sync.ReplySync.encode(message.replySync, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a Sync message from the specified reader or buffer.
         * @function decode
         * @memberof sync.Sync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.Sync} Sync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Sync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.Sync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.richLogootSOpMsg = $root.sync.RichLogootSOperationMsg.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.querySync = $root.sync.QuerySync.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.replySync = $root.sync.ReplySync.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return Sync;
    })();

    sync.RichLogootSOperationMsg = (function() {

        /**
         * Properties of a RichLogootSOperationMsg.
         * @memberof sync
         * @interface IRichLogootSOperationMsg
         * @property {number} [id] RichLogootSOperationMsg id
         * @property {number} [clock] RichLogootSOperationMsg clock
         * @property {sync.ILogootSAddMsg} [logootSAddMsg] RichLogootSOperationMsg logootSAddMsg
         * @property {sync.ILogootSDelMsg} [logootSDelMsg] RichLogootSOperationMsg logootSDelMsg
         */

        /**
         * Constructs a new RichLogootSOperationMsg.
         * @memberof sync
         * @classdesc Represents a RichLogootSOperationMsg.
         * @constructor
         * @param {sync.IRichLogootSOperationMsg=} [properties] Properties to set
         */
        function RichLogootSOperationMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RichLogootSOperationMsg id.
         * @member {number}id
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.id = 0;

        /**
         * RichLogootSOperationMsg clock.
         * @member {number}clock
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.clock = 0;

        /**
         * RichLogootSOperationMsg logootSAddMsg.
         * @member {(sync.ILogootSAddMsg|null|undefined)}logootSAddMsg
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.logootSAddMsg = null;

        /**
         * RichLogootSOperationMsg logootSDelMsg.
         * @member {(sync.ILogootSDelMsg|null|undefined)}logootSDelMsg
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.logootSDelMsg = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * RichLogootSOperationMsg type.
         * @member {string|undefined} type
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        Object.defineProperty(RichLogootSOperationMsg.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["logootSAddMsg", "logootSDelMsg"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RichLogootSOperationMsg instance using the specified properties.
         * @function create
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {sync.IRichLogootSOperationMsg=} [properties] Properties to set
         * @returns {sync.RichLogootSOperationMsg} RichLogootSOperationMsg instance
         */
        RichLogootSOperationMsg.create = function create(properties) {
            return new RichLogootSOperationMsg(properties);
        };

        /**
         * Encodes the specified RichLogootSOperationMsg message. Does not implicitly {@link sync.RichLogootSOperationMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {sync.IRichLogootSOperationMsg} message RichLogootSOperationMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RichLogootSOperationMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.clock != null && message.hasOwnProperty("clock"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.clock);
            if (message.logootSAddMsg != null && message.hasOwnProperty("logootSAddMsg"))
                $root.sync.LogootSAddMsg.encode(message.logootSAddMsg, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.logootSDelMsg != null && message.hasOwnProperty("logootSDelMsg"))
                $root.sync.LogootSDelMsg.encode(message.logootSDelMsg, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a RichLogootSOperationMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.RichLogootSOperationMsg} RichLogootSOperationMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RichLogootSOperationMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.RichLogootSOperationMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.clock = reader.int32();
                    break;
                case 3:
                    message.logootSAddMsg = $root.sync.LogootSAddMsg.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.logootSDelMsg = $root.sync.LogootSDelMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return RichLogootSOperationMsg;
    })();

    sync.LogootSAddMsg = (function() {

        /**
         * Properties of a LogootSAddMsg.
         * @memberof sync
         * @interface ILogootSAddMsg
         * @property {sync.IIdentifierMsg} [id] LogootSAddMsg id
         * @property {string} [content] LogootSAddMsg content
         */

        /**
         * Constructs a new LogootSAddMsg.
         * @memberof sync
         * @classdesc Represents a LogootSAddMsg.
         * @constructor
         * @param {sync.ILogootSAddMsg=} [properties] Properties to set
         */
        function LogootSAddMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogootSAddMsg id.
         * @member {(sync.IIdentifierMsg|null|undefined)}id
         * @memberof sync.LogootSAddMsg
         * @instance
         */
        LogootSAddMsg.prototype.id = null;

        /**
         * LogootSAddMsg content.
         * @member {string}content
         * @memberof sync.LogootSAddMsg
         * @instance
         */
        LogootSAddMsg.prototype.content = "";

        /**
         * Creates a new LogootSAddMsg instance using the specified properties.
         * @function create
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {sync.ILogootSAddMsg=} [properties] Properties to set
         * @returns {sync.LogootSAddMsg} LogootSAddMsg instance
         */
        LogootSAddMsg.create = function create(properties) {
            return new LogootSAddMsg(properties);
        };

        /**
         * Encodes the specified LogootSAddMsg message. Does not implicitly {@link sync.LogootSAddMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {sync.ILogootSAddMsg} message LogootSAddMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogootSAddMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                $root.sync.IdentifierMsg.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.content != null && message.hasOwnProperty("content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Decodes a LogootSAddMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.LogootSAddMsg} LogootSAddMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogootSAddMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.LogootSAddMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = $root.sync.IdentifierMsg.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return LogootSAddMsg;
    })();

    sync.IdentifierMsg = (function() {

        /**
         * Properties of an IdentifierMsg.
         * @memberof sync
         * @interface IIdentifierMsg
         * @property {Array.<number>} [base] IdentifierMsg base
         * @property {number} [last] IdentifierMsg last
         */

        /**
         * Constructs a new IdentifierMsg.
         * @memberof sync
         * @classdesc Represents an IdentifierMsg.
         * @constructor
         * @param {sync.IIdentifierMsg=} [properties] Properties to set
         */
        function IdentifierMsg(properties) {
            this.base = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdentifierMsg base.
         * @member {Array.<number>}base
         * @memberof sync.IdentifierMsg
         * @instance
         */
        IdentifierMsg.prototype.base = $util.emptyArray;

        /**
         * IdentifierMsg last.
         * @member {number}last
         * @memberof sync.IdentifierMsg
         * @instance
         */
        IdentifierMsg.prototype.last = 0;

        /**
         * Creates a new IdentifierMsg instance using the specified properties.
         * @function create
         * @memberof sync.IdentifierMsg
         * @static
         * @param {sync.IIdentifierMsg=} [properties] Properties to set
         * @returns {sync.IdentifierMsg} IdentifierMsg instance
         */
        IdentifierMsg.create = function create(properties) {
            return new IdentifierMsg(properties);
        };

        /**
         * Encodes the specified IdentifierMsg message. Does not implicitly {@link sync.IdentifierMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IdentifierMsg
         * @static
         * @param {sync.IIdentifierMsg} message IdentifierMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdentifierMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.base != null && message.base.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.base.length; ++i)
                    writer.int32(message.base[i]);
                writer.ldelim();
            }
            if (message.last != null && message.hasOwnProperty("last"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.last);
            return writer;
        };

        /**
         * Decodes an IdentifierMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IdentifierMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IdentifierMsg} IdentifierMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdentifierMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IdentifierMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.base && message.base.length))
                        message.base = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.base.push(reader.int32());
                    } else
                        message.base.push(reader.int32());
                    break;
                case 2:
                    message.last = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IdentifierMsg;
    })();

    sync.LogootSDelMsg = (function() {

        /**
         * Properties of a LogootSDelMsg.
         * @memberof sync
         * @interface ILogootSDelMsg
         * @property {Array.<sync.IIdentifierIntervalMsg>} [lid] LogootSDelMsg lid
         */

        /**
         * Constructs a new LogootSDelMsg.
         * @memberof sync
         * @classdesc Represents a LogootSDelMsg.
         * @constructor
         * @param {sync.ILogootSDelMsg=} [properties] Properties to set
         */
        function LogootSDelMsg(properties) {
            this.lid = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogootSDelMsg lid.
         * @member {Array.<sync.IIdentifierIntervalMsg>}lid
         * @memberof sync.LogootSDelMsg
         * @instance
         */
        LogootSDelMsg.prototype.lid = $util.emptyArray;

        /**
         * Creates a new LogootSDelMsg instance using the specified properties.
         * @function create
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {sync.ILogootSDelMsg=} [properties] Properties to set
         * @returns {sync.LogootSDelMsg} LogootSDelMsg instance
         */
        LogootSDelMsg.create = function create(properties) {
            return new LogootSDelMsg(properties);
        };

        /**
         * Encodes the specified LogootSDelMsg message. Does not implicitly {@link sync.LogootSDelMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {sync.ILogootSDelMsg} message LogootSDelMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogootSDelMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lid != null && message.lid.length)
                for (var i = 0; i < message.lid.length; ++i)
                    $root.sync.IdentifierIntervalMsg.encode(message.lid[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a LogootSDelMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.LogootSDelMsg} LogootSDelMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogootSDelMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.LogootSDelMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.lid && message.lid.length))
                        message.lid = [];
                    message.lid.push($root.sync.IdentifierIntervalMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return LogootSDelMsg;
    })();

    sync.IdentifierIntervalMsg = (function() {

        /**
         * Properties of an IdentifierIntervalMsg.
         * @memberof sync
         * @interface IIdentifierIntervalMsg
         * @property {Array.<number>} [base] IdentifierIntervalMsg base
         * @property {number} [begin] IdentifierIntervalMsg begin
         * @property {number} [end] IdentifierIntervalMsg end
         */

        /**
         * Constructs a new IdentifierIntervalMsg.
         * @memberof sync
         * @classdesc Represents an IdentifierIntervalMsg.
         * @constructor
         * @param {sync.IIdentifierIntervalMsg=} [properties] Properties to set
         */
        function IdentifierIntervalMsg(properties) {
            this.base = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdentifierIntervalMsg base.
         * @member {Array.<number>}base
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.base = $util.emptyArray;

        /**
         * IdentifierIntervalMsg begin.
         * @member {number}begin
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.begin = 0;

        /**
         * IdentifierIntervalMsg end.
         * @member {number}end
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.end = 0;

        /**
         * Creates a new IdentifierIntervalMsg instance using the specified properties.
         * @function create
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {sync.IIdentifierIntervalMsg=} [properties] Properties to set
         * @returns {sync.IdentifierIntervalMsg} IdentifierIntervalMsg instance
         */
        IdentifierIntervalMsg.create = function create(properties) {
            return new IdentifierIntervalMsg(properties);
        };

        /**
         * Encodes the specified IdentifierIntervalMsg message. Does not implicitly {@link sync.IdentifierIntervalMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {sync.IIdentifierIntervalMsg} message IdentifierIntervalMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdentifierIntervalMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.base != null && message.base.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.base.length; ++i)
                    writer.int32(message.base[i]);
                writer.ldelim();
            }
            if (message.begin != null && message.hasOwnProperty("begin"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.begin);
            if (message.end != null && message.hasOwnProperty("end"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.end);
            return writer;
        };

        /**
         * Decodes an IdentifierIntervalMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IdentifierIntervalMsg} IdentifierIntervalMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdentifierIntervalMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IdentifierIntervalMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.base && message.base.length))
                        message.base = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.base.push(reader.int32());
                    } else
                        message.base.push(reader.int32());
                    break;
                case 2:
                    message.begin = reader.int32();
                    break;
                case 3:
                    message.end = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IdentifierIntervalMsg;
    })();

    sync.QuerySync = (function() {

        /**
         * Properties of a QuerySync.
         * @memberof sync
         * @interface IQuerySync
         * @property {Object.<string,number>} [vector] QuerySync vector
         */

        /**
         * Constructs a new QuerySync.
         * @memberof sync
         * @classdesc Represents a QuerySync.
         * @constructor
         * @param {sync.IQuerySync=} [properties] Properties to set
         */
        function QuerySync(properties) {
            this.vector = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuerySync vector.
         * @member {Object.<string,number>}vector
         * @memberof sync.QuerySync
         * @instance
         */
        QuerySync.prototype.vector = $util.emptyObject;

        /**
         * Creates a new QuerySync instance using the specified properties.
         * @function create
         * @memberof sync.QuerySync
         * @static
         * @param {sync.IQuerySync=} [properties] Properties to set
         * @returns {sync.QuerySync} QuerySync instance
         */
        QuerySync.create = function create(properties) {
            return new QuerySync(properties);
        };

        /**
         * Encodes the specified QuerySync message. Does not implicitly {@link sync.QuerySync.verify|verify} messages.
         * @function encode
         * @memberof sync.QuerySync
         * @static
         * @param {sync.IQuerySync} message QuerySync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuerySync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.vector != null && message.hasOwnProperty("vector"))
                for (var keys = Object.keys(message.vector), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.vector[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Decodes a QuerySync message from the specified reader or buffer.
         * @function decode
         * @memberof sync.QuerySync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.QuerySync} QuerySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuerySync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.QuerySync(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.vector === $util.emptyObject)
                        message.vector = {};
                    key = reader.int32();
                    reader.pos++;
                    message.vector[key] = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return QuerySync;
    })();

    sync.ReplySync = (function() {

        /**
         * Properties of a ReplySync.
         * @memberof sync
         * @interface IReplySync
         * @property {Array.<sync.IRichLogootSOperationMsg>} [richLogootSOpsMsg] ReplySync richLogootSOpsMsg
         * @property {Array.<sync.IIntervalMsg>} [intervals] ReplySync intervals
         */

        /**
         * Constructs a new ReplySync.
         * @memberof sync
         * @classdesc Represents a ReplySync.
         * @constructor
         * @param {sync.IReplySync=} [properties] Properties to set
         */
        function ReplySync(properties) {
            this.richLogootSOpsMsg = [];
            this.intervals = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReplySync richLogootSOpsMsg.
         * @member {Array.<sync.IRichLogootSOperationMsg>}richLogootSOpsMsg
         * @memberof sync.ReplySync
         * @instance
         */
        ReplySync.prototype.richLogootSOpsMsg = $util.emptyArray;

        /**
         * ReplySync intervals.
         * @member {Array.<sync.IIntervalMsg>}intervals
         * @memberof sync.ReplySync
         * @instance
         */
        ReplySync.prototype.intervals = $util.emptyArray;

        /**
         * Creates a new ReplySync instance using the specified properties.
         * @function create
         * @memberof sync.ReplySync
         * @static
         * @param {sync.IReplySync=} [properties] Properties to set
         * @returns {sync.ReplySync} ReplySync instance
         */
        ReplySync.create = function create(properties) {
            return new ReplySync(properties);
        };

        /**
         * Encodes the specified ReplySync message. Does not implicitly {@link sync.ReplySync.verify|verify} messages.
         * @function encode
         * @memberof sync.ReplySync
         * @static
         * @param {sync.IReplySync} message ReplySync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplySync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.richLogootSOpsMsg != null && message.richLogootSOpsMsg.length)
                for (var i = 0; i < message.richLogootSOpsMsg.length; ++i)
                    $root.sync.RichLogootSOperationMsg.encode(message.richLogootSOpsMsg[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.intervals != null && message.intervals.length)
                for (var i = 0; i < message.intervals.length; ++i)
                    $root.sync.IntervalMsg.encode(message.intervals[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a ReplySync message from the specified reader or buffer.
         * @function decode
         * @memberof sync.ReplySync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.ReplySync} ReplySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplySync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.ReplySync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.richLogootSOpsMsg && message.richLogootSOpsMsg.length))
                        message.richLogootSOpsMsg = [];
                    message.richLogootSOpsMsg.push($root.sync.RichLogootSOperationMsg.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.intervals && message.intervals.length))
                        message.intervals = [];
                    message.intervals.push($root.sync.IntervalMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return ReplySync;
    })();

    sync.IntervalMsg = (function() {

        /**
         * Properties of an IntervalMsg.
         * @memberof sync
         * @interface IIntervalMsg
         * @property {number} [id] IntervalMsg id
         * @property {number} [begin] IntervalMsg begin
         * @property {number} [end] IntervalMsg end
         */

        /**
         * Constructs a new IntervalMsg.
         * @memberof sync
         * @classdesc Represents an IntervalMsg.
         * @constructor
         * @param {sync.IIntervalMsg=} [properties] Properties to set
         */
        function IntervalMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IntervalMsg id.
         * @member {number}id
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.id = 0;

        /**
         * IntervalMsg begin.
         * @member {number}begin
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.begin = 0;

        /**
         * IntervalMsg end.
         * @member {number}end
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.end = 0;

        /**
         * Creates a new IntervalMsg instance using the specified properties.
         * @function create
         * @memberof sync.IntervalMsg
         * @static
         * @param {sync.IIntervalMsg=} [properties] Properties to set
         * @returns {sync.IntervalMsg} IntervalMsg instance
         */
        IntervalMsg.create = function create(properties) {
            return new IntervalMsg(properties);
        };

        /**
         * Encodes the specified IntervalMsg message. Does not implicitly {@link sync.IntervalMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IntervalMsg
         * @static
         * @param {sync.IIntervalMsg} message IntervalMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IntervalMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.begin != null && message.hasOwnProperty("begin"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.begin);
            if (message.end != null && message.hasOwnProperty("end"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.end);
            return writer;
        };

        /**
         * Decodes an IntervalMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IntervalMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IntervalMsg} IntervalMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IntervalMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IntervalMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.begin = reader.int32();
                    break;
                case 3:
                    message.end = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IntervalMsg;
    })();

    return sync;
})();

module.exports = $root;
