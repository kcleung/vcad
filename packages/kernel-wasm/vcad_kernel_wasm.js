/* @ts-self-types="./vcad_kernel_wasm.d.ts" */

/**
 * A live circuit simulation. Build from a `CircuitSpec` JSON, then `step`.
 */
export class CircuitSim {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CircuitSimFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_circuitsim_free(ptr, 0);
    }
    /**
     * The configured timestep (s).
     * @returns {number}
     */
    dt() {
        const ret = wasm.circuitsim_dt(this.__wbg_ptr);
        return ret;
    }
    /**
     * Build a simulation from a JSON `{ dt, devices: [...] }` spec.
     * @param {string} spec_json
     */
    constructor(spec_json) {
        const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.circuitsim_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        CircuitSimFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Current state without advancing time.
     * @returns {any}
     */
    observe() {
        const ret = wasm.circuitsim_observe(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Reset to the power-on state (caps discharged, inductors zero, t = 0).
     */
    reset() {
        wasm.circuitsim_reset(this.__wbg_ptr);
    }
    /**
     * Mutate a device's primary scalar (drive a switch / PWM / scrubbed value).
     * @param {number} device_id
     * @param {number} value
     */
    setValue(device_id, value) {
        wasm.circuitsim_setValue(this.__wbg_ptr, device_id, value);
    }
    /**
     * Advance the simulation by `n` timesteps; returns the final observation.
     * @param {number} n
     * @returns {any}
     */
    step(n) {
        const ret = wasm.circuitsim_step(this.__wbg_ptr, n);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
if (Symbol.dispose) CircuitSim.prototype[Symbol.dispose] = CircuitSim.prototype.free;

/**
 * Incremental document evaluation: keep one per open document and pass it
 * every edit of that document. Only nodes whose subtree changed since the
 * previous `evaluate` are redone, and only changed roots re-tessellated;
 * the result equals `evaluateDocument` (same scene shape).
 */
export class IncrementalEvaluator {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IncrementalEvaluatorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_incrementalevaluator_free(ptr, 0);
    }
    /**
     * Drop everything carried (the next evaluation is cold).
     */
    clear() {
        wasm.incrementalevaluator_clear(this.__wbg_ptr);
    }
    /**
     * `evaluateDocument`, reusing everything the edit didn't touch.
     * @param {string} doc_json
     * @param {boolean} skip_clash_detection
     * @returns {any}
     */
    evaluate(doc_json, skip_clash_detection) {
        const val2 = +skip_clash_detection;
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.incrementalevaluator_evaluate(this.__wbg_ptr, ptr0, len0, val2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * A fresh evaluator (its first `evaluate` is cold).
     */
    constructor() {
        const ret = wasm.incrementalevaluator_new();
        this.__wbg_ptr = ret;
        IncrementalEvaluatorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * `[reusedSolids, evaluatedSolids, reusedMeshes]` from the last evaluation.
     * @returns {Uint32Array}
     */
    stats() {
        const ret = wasm.incrementalevaluator_stats(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) IncrementalEvaluator.prototype[Symbol.dispose] = IncrementalEvaluator.prototype.free;

/**
 * A stateful molecular-dynamics environment exposed to JS.
 */
export class MdSim {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MdSimFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mdsim_free(ptr, 0);
    }
    /**
     * Current structure as a `MoleculeSystem` JSON string.
     * @returns {string}
     */
    moleculeJson() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.mdsim_moleculeJson(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Create an environment from a `MoleculeSystem` JSON and config JSON.
     * @param {string} molecule_json
     * @param {string} config_json
     */
    constructor(molecule_json, config_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.mdsim_new(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        MdSimFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Current observation JSON without stepping.
     * @returns {string}
     */
    observe() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.mdsim_observe(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Reset to the initial structure; returns an observation JSON.
     * @returns {string}
     */
    reset() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.mdsim_reset(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Run `steps` MD steps; returns an observation JSON.
     * @param {number} steps
     * @returns {string}
     */
    run(steps) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.mdsim_run(this.__wbg_ptr, steps);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
}
if (Symbol.dispose) MdSim.prototype[Symbol.dispose] = MdSim.prototype.free;

/**
 * Physics simulation environment for robotics and RL.
 *
 * This provides a gym-style interface for simulating robot assemblies
 * with physics, joints, and collision detection.
 */
export class PhysicsSim {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PhysicsSimFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_physicssim_free(ptr, 0);
    }
    /**
     * Get the action dimension.
     * @returns {number}
     */
    actionDim() {
        const ret = wasm.physicssim_actionDim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Actuated joint ids in action order (document order, Fixed joints
     * excluded). Action vector entry `i` drives `actuatedJointIds()[i]`.
     * @returns {string[]}
     */
    actuatedJointIds() {
        const ret = wasm.physicssim_actuatedJointIds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Joint ids in observation order (document `joints` order).
     *
     * Joints map onto `joint_positions` / `joint_velocities` by *slice*, not
     * by index: joint `i` owns the next `jointSlotCounts()[i]` entries. The
     * lists are the same length only when every joint is single-DOF. Action
     * vector entries index `actuatedJointIds()` instead, which drops zero-dof
     * (Fixed) joints.
     * @returns {string[]}
     */
    jointIds() {
        const ret = wasm.physicssim_jointIds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Observation slots occupied by each joint in `jointIds()` order:
     * `max(1, ndof)` — Fixed 1, Revolute / Slider / Cylindrical 1, Ball 3,
     * Free 6. Walk it as a cursor to split an observation into per-joint
     * slices.
     * @returns {Uint32Array}
     */
    jointSlotCounts() {
        const ret = wasm.physicssim_jointSlotCounts(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Create a new physics simulation from a vcad document JSON.
     *
     * # Arguments
     * * `doc_json` - JSON string representing a vcad IR Document
     * * `end_effector_ids` - Array of instance IDs to track as end effectors
     * * `dt` - Simulation timestep in seconds (default: 1/240)
     * * `substeps` - Number of physics substeps per step (default: 4)
     * * `config_json` - Optional JSON `EnvConfig`: domain randomization,
     *   observation noise, termination conditions, base instance id
     * * `ground_enabled` - Ground-plane contact at z = `ground_height` (default: true)
     * * `ground_height` - Ground plane height in meters (default: 0)
     * * `ground_friction` - Ground Coulomb friction coefficient (default: 0.8)
     * * `ground_restitution` - Ground restitution, 0 = inelastic (default: 0)
     * @param {string} doc_json
     * @param {string[]} end_effector_ids
     * @param {number | null} [dt]
     * @param {number | null} [substeps]
     * @param {string | null} [config_json]
     * @param {boolean | null} [ground_enabled]
     * @param {number | null} [ground_height]
     * @param {number | null} [ground_friction]
     * @param {number | null} [ground_restitution]
     */
    constructor(doc_json, end_effector_ids, dt, substeps, config_json, ground_enabled, ground_height, ground_friction, ground_restitution) {
        const val4 = +(isLikeNone(dt) ? Number.MAX_SAFE_INTEGER : Math.fround(dt));
        const val5 = +(isLikeNone(substeps) ? Number.MAX_SAFE_INTEGER : (substeps) >>> 0);
        const val6 = +(isLikeNone(ground_height) ? 0 : ground_height);
        const val7 = +(isLikeNone(ground_friction) ? 0 : ground_friction);
        const val8 = +(isLikeNone(ground_restitution) ? 0 : ground_restitution);
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(end_effector_ids, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(config_json) ? 0 : passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__externref_drop_slice(ptr1, len1); wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.physicssim_new(ptr0, len0, ptr1, len1, val4, val5, ptr2, len2, isLikeNone(ground_enabled) ? 0xFFFFFF : ground_enabled ? 1 : 0, !isLikeNone(ground_height), val6, !isLikeNone(ground_friction), val7, !isLikeNone(ground_restitution), val8);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        PhysicsSimFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Get the number of joints in the environment.
     * @returns {number}
     */
    numJoints() {
        const ret = wasm.physicssim_numJoints(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Get the observation dimension.
     * @returns {number}
     */
    observationDim() {
        const ret = wasm.physicssim_observationDim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Get current observation without stepping.
     *
     * Returns observation as JSON.
     * @returns {any}
     */
    observe() {
        const ret = wasm.physicssim_observe(this.__wbg_ptr);
        return ret;
    }
    /**
     * Reset with a new seed: re-seeds the domain-randomization stream
     * (episode counter rewinds to 0) and resets. Returns the initial
     * observation as JSON.
     * @param {bigint} seed
     * @returns {any}
     */
    resetSeeded(seed) {
        const ret = wasm.physicssim_resetSeeded(this.__wbg_ptr, seed);
        return ret;
    }
    /**
     * Reset the environment to initial state.
     *
     * Returns the initial observation as JSON.
     * @returns {any}
     */
    reset() {
        const ret = wasm.physicssim_reset(this.__wbg_ptr);
        return ret;
    }
    /**
     * Set explicit per-joint PD gains, overriding the inertia-scaled
     * defaults for position and velocity servos.
     *
     * # Arguments
     * * `gains_json` - JSON object mapping joint id → `{ "kp": .., "kd": .. }`
     * @param {string} gains_json
     */
    setJointGains(gains_json) {
        const ptr0 = passStringToWasm0(gains_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.physicssim_setJointGains(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Set the maximum episode length.
     * @param {number} max_steps
     */
    setMaxSteps(max_steps) {
        wasm.physicssim_setMaxSteps(this.__wbg_ptr, max_steps);
    }
    /**
     * Set the random seed.
     * @param {bigint} seed
     */
    setSeed(seed) {
        wasm.physicssim_setSeed(this.__wbg_ptr, seed);
    }
    /**
     * Step the simulation with position targets.
     *
     * # Arguments
     * * `targets` - Array of position targets for each joint (degrees or mm)
     *
     * # Returns
     * Object with { observation, reward, done, info }
     * @param {Float64Array | number[]} targets
     * @returns {any}
     */
    stepPosition(targets) {
        const ptr0 = passArrayF64ToWasm0(targets, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.physicssim_stepPosition(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Step the simulation with a torque action.
     *
     * # Arguments
     * * `torques` - Array of torques/forces for each joint (Nm or N)
     *
     * # Returns
     * Object with { observation, reward, done, info }
     * @param {Float64Array | number[]} torques
     * @returns {any}
     */
    stepTorque(torques) {
        const ptr0 = passArrayF64ToWasm0(torques, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.physicssim_stepTorque(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Step the simulation with velocity targets.
     *
     * # Arguments
     * * `targets` - Array of velocity targets for each joint (deg/s or mm/s)
     *
     * # Returns
     * Object with { observation, reward, done, info }
     * @param {Float64Array | number[]} targets
     * @returns {any}
     */
    stepVelocity(targets) {
        const ptr0 = passArrayF64ToWasm0(targets, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.physicssim_stepVelocity(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
}
if (Symbol.dispose) PhysicsSim.prototype[Symbol.dispose] = PhysicsSim.prototype.free;

/**
 * GPU-accelerated ray tracer for direct BRep rendering.
 *
 * This ray tracer renders BRep surfaces directly without tessellation,
 * achieving pixel-perfect silhouettes at any zoom level.
 *
 * All mutable state lives behind a `RefCell` so every wasm-bindgen entry point
 * can be `&self`. The async `render` previously held `&mut self` across `.await`
 * and tripped wasm-bindgen's "recursive use of an object detected" guard
 * whenever a setter (theme/debug/edges/upload) fired while a render was in
 * flight. Now setters take a brief mutable borrow on `inner`, the scene is
 * stored as `Rc<GpuScene>` so a render can hold a stable handle across the
 * await even if the scene gets swapped, and the accumulation buffers are
 * taken out for the duration of the render and re-installed after — gated by
 * an epoch counter so resets that happen mid-render correctly invalidate the
 * returned buffers.
 */
export class RayTracer {
    static __wrap(ptr) {
        const obj = Object.create(RayTracer.prototype);
        obj.__wbg_ptr = ptr;
        RayTracerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RayTracerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_raytracer_free(ptr, 0);
    }
    /**
     * Check if a solid can be ray traced.
     *
     * Returns true if the solid has a BRep representation.
     * @param {Solid} solid
     * @returns {boolean}
     */
    static canRaytrace(solid) {
        _assertClass(solid, Solid);
        const ret = wasm.raytracer_canRaytrace(solid.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Clear all uploaded geometry. Call before re-uploading a fresh
     * scene; subsequent `upload_solid` calls will accumulate into a
     * new merged scene.
     */
    clearScene() {
        wasm.raytracer_clearScene(this.__wbg_ptr);
    }
    /**
     * Create a new ray tracer.
     *
     * Requires WebGPU to be available and initialized.
     * Call `initGpu()` before calling this method.
     * @returns {RayTracer}
     */
    static create() {
        const ret = wasm.raytracer_create();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RayTracer.__wrap(ret[0]);
    }
    /**
     * Get the current debug render mode.
     * @returns {number}
     */
    getDebugMode() {
        const ret = wasm.raytracer_getDebugMode(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Get whether edge detection is enabled.
     * @returns {boolean}
     */
    getEdgeDetectionEnabled() {
        const ret = wasm.raytracer_getEdgeDetectionEnabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Get the current frame index for progressive rendering.
     * @returns {number}
     */
    getFrameIndex() {
        const ret = wasm.raytracer_getFrameIndex(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Get the current refinement sample count.
     * @returns {number}
     */
    getRefineSamples() {
        const ret = wasm.raytracer_getRefineSamples(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Check if the ray tracer has a scene loaded.
     * @returns {boolean}
     */
    hasScene() {
        const ret = wasm.raytracer_hasScene(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pick a face at the given pixel coordinates.
     *
     * # Arguments
     * * `camera`, `target`, `up` - Camera parameters
     * * `width`, `height`, `fov` - View parameters
     * * `pixel_x`, `pixel_y` - Pixel coordinates to pick
     *
     * # Returns
     * Face index if a face was hit, or -1 if background was hit.
     * @param {Float64Array | number[]} camera
     * @param {Float64Array | number[]} target
     * @param {Float64Array | number[]} up
     * @param {number} width
     * @param {number} height
     * @param {number} fov
     * @param {number} pixel_x
     * @param {number} pixel_y
     * @returns {number}
     */
    pick(camera, target, up, width, height, fov, pixel_x, pixel_y) {
        const val4 = +width;
        const val5 = +height;
        const val6 = +fov;
        const val7 = +pixel_x;
        const val8 = +pixel_y;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passArrayF64ToWasm0(camera, wasm.__wbindgen_malloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayF64ToWasm0(up, wasm.__wbindgen_malloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 8, 8); }
            throw e;
        }
        const ret = wasm.raytracer_pick(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, val4, val5, val6, val7, val8);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * Render the scene to an RGBA image with progressive anti-aliasing.
     *
     * Each call accumulates another sample. Call `resetAccumulation()` when the
     * camera moves to restart the accumulation.
     *
     * # Arguments
     * * `camera` - Camera position [x, y, z]
     * * `target` - Look-at target [x, y, z]
     * * `up` - Up vector [x, y, z]
     * * `width` - Image width in pixels
     * * `height` - Image height in pixels
     * * `fov` - Field of view in radians
     *
     * # Returns
     * RGBA pixel data as a byte array (width * height * 4 bytes).
     *
     * # Note
     * This function is async to support WASM's single-threaded environment.
     * In JavaScript, it returns a `Promise<Uint8Array>`.
     * @param {Float64Array | number[]} camera
     * @param {Float64Array | number[]} target
     * @param {Float64Array | number[]} up
     * @param {number} width
     * @param {number} height
     * @param {number} fov
     * @returns {Promise<Uint8Array>}
     */
    render(camera, target, up, width, height, fov) {
        const val4 = +width;
        const val5 = +height;
        const val6 = +fov;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passArrayF64ToWasm0(camera, wasm.__wbindgen_malloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayF64ToWasm0(up, wasm.__wbindgen_malloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 8, 8); }
            throw e;
        }
        const ret = wasm.raytracer_render(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, val4, val5, val6);
        return ret;
    }
    /**
     * Reset the progressive accumulation (call when camera moves).
     */
    resetAccumulation() {
        wasm.raytracer_resetAccumulation(this.__wbg_ptr);
    }
    /**
     * Set the debug render mode.
     *
     * # Arguments
     * * `mode` - Debug mode: 0=normal, 1=normals as RGB, 2=face_id colors, 3=N·L grayscale, 4=orientation
     *
     * Call resetAccumulation() after changing mode to see immediate effect.
     * @param {number} mode
     */
    setDebugMode(mode) {
        wasm.raytracer_setDebugMode(this.__wbg_ptr, mode);
    }
    /**
     * Set edge detection settings.
     *
     * # Arguments
     * * `enabled` - Whether to show edge detection overlay
     * * `depth_threshold` - Depth discontinuity threshold (default: 0.1)
     * * `normal_threshold` - Normal angle threshold in degrees (default: 30.0)
     * @param {boolean} enabled
     * @param {number} depth_threshold
     * @param {number} normal_threshold
     */
    setEdgeDetection(enabled, depth_threshold, normal_threshold) {
        wasm.raytracer_setEdgeDetection(this.__wbg_ptr, enabled, depth_threshold, normal_threshold);
    }
    /**
     * Set per-type edge style (colors, widths, softness, and individual toggles).
     *
     * Colors are RGBA in linear space (0–1). Width 1.0 = one pixel; softness controls
     * the sub-pixel anti-aliasing transition width.
     * @param {boolean} enable_silhouette
     * @param {boolean} enable_crease
     * @param {boolean} enable_boundary
     * @param {number} silhouette_r
     * @param {number} silhouette_g
     * @param {number} silhouette_b
     * @param {number} silhouette_a
     * @param {number} crease_r
     * @param {number} crease_g
     * @param {number} crease_b
     * @param {number} crease_a
     * @param {number} boundary_r
     * @param {number} boundary_g
     * @param {number} boundary_b
     * @param {number} boundary_a
     * @param {number} silhouette_width
     * @param {number} crease_width
     * @param {number} boundary_width
     * @param {number} edge_softness
     */
    setEdgeStyle(enable_silhouette, enable_crease, enable_boundary, silhouette_r, silhouette_g, silhouette_b, silhouette_a, crease_r, crease_g, crease_b, crease_a, boundary_r, boundary_g, boundary_b, boundary_a, silhouette_width, crease_width, boundary_width, edge_softness) {
        wasm.raytracer_setEdgeStyle(this.__wbg_ptr, enable_silhouette, enable_crease, enable_boundary, silhouette_r, silhouette_g, silhouette_b, silhouette_a, crease_r, crease_g, crease_b, crease_a, boundary_r, boundary_g, boundary_b, boundary_a, silhouette_width, crease_width, boundary_width, edge_softness);
    }
    /**
     * Set the material for all faces in the scene.
     *
     * # Arguments
     * * `r`, `g`, `b` - RGB color components (0-1 range, linear)
     * * `metallic` - Metallic factor (0 = dielectric, 1 = metal)
     * * `roughness` - Roughness factor (0 = smooth/mirror, 1 = rough/diffuse)
     * Set the material from a serialized IR `MaterialDef`.
     *
     * Preferred over `setMaterial`: that one only carries colour, metallic and
     * roughness, so clearcoat, IOR and anisotropy never reached the viewport
     * and a brushed or lacquered part shaded differently here than under
     * `vcad-render --photoreal`. This runs the SAME derivation the CPU
     * renderer uses (`pathtrace::from_material_def`), so both agree by construction.
     *
     * `json` is a `MaterialDef` object; pass `null`/empty to fall back to the
     * optional `tint` (linear RGB) or the neutral default.
     * @param {string | null} [json]
     * @param {Float64Array | number[] | null} [tint]
     */
    setMaterialFromDef(json, tint) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = isLikeNone(json) ? 0 : passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(tint) ? 0 : passArrayF64ToWasm0(tint, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.raytracer_setMaterialFromDef(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} metallic
     * @param {number} roughness
     */
    setMaterial(r, g, b, metallic, roughness) {
        const ret = wasm.raytracer_setMaterial(this.__wbg_ptr, r, g, b, metallic, roughness);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Set the path tracer's quality ceiling and stylisation mode.
     *
     * Replaces the old `setAO`. The renderer is a real path tracer now, so
     * screen-space ambient occlusion is gone — multi-bounce GI computes
     * contact occlusion correctly, and stacking a proxy on top of it would
     * double-darken every concave corner.
     *
     * # Arguments
     * * `max_depth` - Ceiling on path length (1 = direct lighting only,
     *   default 6, which matches `vcad-render --photoreal`). Actual depth
     *   escalates with accumulation, so the draft frame stays interactive
     *   regardless of this value.
     * * `stylize` - Draw the Sobel edge overlay. Turn this OFF for a
     *   photoreal viewport: edge lines fight photorealism.
     * @param {number} max_depth
     * @param {boolean} stylize
     */
    setPathTrace(max_depth, stylize) {
        wasm.raytracer_setPathTrace(this.__wbg_ptr, max_depth, stylize);
    }
    /**
     * Set the adaptive refinement sample count.
     *
     * Edge pixels on silhouettes receive additional stratified rays for sub-pixel
     * anti-aliasing. Set to 0 to disable (default), or 4/9/16 for typical quality.
     * Mode 5 in setDebugMode shows a heatmap of rays per pixel for tuning.
     * @param {number} count
     */
    setRefineSamples(count) {
        wasm.raytracer_setRefineSamples(this.__wbg_ptr, count);
    }
    /**
     * Set the visible-background theme. 0 = dark (default), 1 = light.
     * IBL panels and direct lighting stay constant across themes — this
     * only swaps the atmospheric backdrop and ground tint.
     * @param {number} theme
     */
    setTheme(theme) {
        wasm.raytracer_setTheme(this.__wbg_ptr, theme);
    }
    /**
     * Upload a solid with its own material. Each uploaded solid's faces
     * keep a distinct material slot (`GpuScene::merge` offsets material
     * indices), so assemblies render per-part materials in one pass.
     * @param {Solid} solid
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} metallic
     * @param {number} roughness
     */
    uploadSolidWithMaterial(solid, r, g, b, metallic, roughness) {
        _assertClass(solid, Solid);
        const ret = wasm.raytracer_uploadSolidWithMaterial(this.__wbg_ptr, solid.__wbg_ptr, r, g, b, metallic, roughness);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Upload a solid's BRep representation for ray tracing.
     *
     * First call after clearScene seeds the GPU scene. Subsequent calls
     * merge into the existing scene — surfaces/faces/BVH from each new
     * solid are unified under a fresh root, so multi-part scenes render
     * in a single ray-trace pass.
     * @param {Solid} solid
     */
    uploadSolid(solid) {
        _assertClass(solid, Solid);
        const ret = wasm.raytracer_uploadSolid(this.__wbg_ptr, solid.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}
if (Symbol.dispose) RayTracer.prototype[Symbol.dispose] = RayTracer.prototype.free;

/**
 * Slice result for WASM.
 */
export class SliceResult {
    static __wrap(ptr) {
        const obj = Object.create(SliceResult.prototype);
        obj.__wbg_ptr = ptr;
        SliceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SliceResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sliceresult_free(ptr, 0);
    }
    /**
     * Get filament weight in grams.
     * @returns {number}
     */
    get filamentGrams() {
        const ret = wasm.sliceresult_filamentGrams(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get filament usage in mm.
     * @returns {number}
     */
    get filamentMm() {
        const ret = wasm.sliceresult_filamentMm(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get layer data for preview.
     * @param {number} layer_index
     * @returns {any}
     */
    getLayerPreview(layer_index) {
        const ret = wasm.sliceresult_getLayerPreview(this.__wbg_ptr, layer_index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Get number of layers.
     * @returns {number}
     */
    get layerCount() {
        const ret = wasm.sliceresult_layerCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Get estimated print time in seconds.
     * @returns {number}
     */
    get printTimeSeconds() {
        const ret = wasm.sliceresult_printTimeSeconds(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get stats as JSON.
     * @returns {string}
     */
    statsJson() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.sliceresult_statsJson(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
}
if (Symbol.dispose) SliceResult.prototype[Symbol.dispose] = SliceResult.prototype.free;

/**
 * Slicer settings for WASM.
 */
export class SlicerSettings {
    static __wrap(ptr) {
        const obj = Object.create(SlicerSettings.prototype);
        obj.__wbg_ptr = ptr;
        SlicerSettingsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SlicerSettingsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_slicersettings_free(ptr, 0);
    }
    /**
     * First layer height (mm).
     * @returns {number}
     */
    get first_layer_height() {
        const ret = wasm.__wbg_get_slicersettings_first_layer_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * Infill density (0-1).
     * @returns {number}
     */
    get infill_density() {
        const ret = wasm.__wbg_get_slicersettings_infill_density(this.__wbg_ptr);
        return ret;
    }
    /**
     * Infill pattern (0=Grid, 1=Lines, 2=Triangles, 3=Honeycomb, 4=Gyroid).
     * @returns {number}
     */
    get infill_pattern() {
        const ret = wasm.__wbg_get_slicersettings_infill_pattern(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Layer height (mm).
     * @returns {number}
     */
    get layer_height() {
        const ret = wasm.__wbg_get_slicersettings_layer_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * Line width (mm).
     * @returns {number}
     */
    get line_width() {
        const ret = wasm.__wbg_get_slicersettings_line_width(this.__wbg_ptr);
        return ret;
    }
    /**
     * Nozzle diameter (mm).
     * @returns {number}
     */
    get nozzle_diameter() {
        const ret = wasm.__wbg_get_slicersettings_nozzle_diameter(this.__wbg_ptr);
        return ret;
    }
    /**
     * Support angle threshold.
     * @returns {number}
     */
    get support_angle() {
        const ret = wasm.__wbg_get_slicersettings_support_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * Enable support.
     * @returns {boolean}
     */
    get support_enabled() {
        const ret = wasm.__wbg_get_slicersettings_support_enabled(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Wall count.
     * @returns {number}
     */
    get wall_count() {
        const ret = wasm.__wbg_get_slicersettings_wall_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * First layer height (mm).
     * @param {number} arg0
     */
    set first_layer_height(arg0) {
        wasm.__wbg_set_slicersettings_first_layer_height(this.__wbg_ptr, arg0);
    }
    /**
     * Infill density (0-1).
     * @param {number} arg0
     */
    set infill_density(arg0) {
        wasm.__wbg_set_slicersettings_infill_density(this.__wbg_ptr, arg0);
    }
    /**
     * Infill pattern (0=Grid, 1=Lines, 2=Triangles, 3=Honeycomb, 4=Gyroid).
     * @param {number} arg0
     */
    set infill_pattern(arg0) {
        wasm.__wbg_set_slicersettings_infill_pattern(this.__wbg_ptr, arg0);
    }
    /**
     * Layer height (mm).
     * @param {number} arg0
     */
    set layer_height(arg0) {
        wasm.__wbg_set_slicersettings_layer_height(this.__wbg_ptr, arg0);
    }
    /**
     * Line width (mm).
     * @param {number} arg0
     */
    set line_width(arg0) {
        wasm.__wbg_set_slicersettings_line_width(this.__wbg_ptr, arg0);
    }
    /**
     * Nozzle diameter (mm).
     * @param {number} arg0
     */
    set nozzle_diameter(arg0) {
        wasm.__wbg_set_slicersettings_nozzle_diameter(this.__wbg_ptr, arg0);
    }
    /**
     * Support angle threshold.
     * @param {number} arg0
     */
    set support_angle(arg0) {
        wasm.__wbg_set_slicersettings_support_angle(this.__wbg_ptr, arg0);
    }
    /**
     * Enable support.
     * @param {boolean} arg0
     */
    set support_enabled(arg0) {
        wasm.__wbg_set_slicersettings_support_enabled(this.__wbg_ptr, arg0);
    }
    /**
     * Wall count.
     * @param {number} arg0
     */
    set wall_count(arg0) {
        wasm.__wbg_set_slicersettings_wall_count(this.__wbg_ptr, arg0);
    }
    /**
     * Create from JSON.
     * @param {string} json
     * @returns {SlicerSettings}
     */
    static fromJson(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.slicersettings_fromJson(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SlicerSettings.__wrap(ret[0]);
    }
    /**
     * Create default settings.
     */
    constructor() {
        const ret = wasm.slicersettings_new();
        this.__wbg_ptr = ret;
        SlicerSettingsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) SlicerSettings.prototype[Symbol.dispose] = SlicerSettings.prototype.free;

/**
 * A 3D solid geometry object.
 *
 * Create solids from primitives, combine with boolean operations,
 * transform, and extract triangle meshes for rendering.
 */
export class Solid {
    static __wrap(ptr) {
        const obj = Object.create(Solid.prototype);
        obj.__wbg_ptr = ptr;
        SolidFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SolidFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_solid_free(ptr, 0);
    }
    /**
     * Return mesh boundary edges as a flat float array
     * `[x0, y0, z0, x1, y1, z1, ...]` with each pair of 3-component
     * positions defining one edge segment. Used by the viewport's
     * "show boundary edges" overlay to surface tessellation holes.
     *
     * Closed, manifold meshes return an empty array; each entry means
     * there's a hole in the mesh.
     * @param {number | null} [segments]
     * @returns {Float32Array}
     */
    boundaryEdges(segments) {
        const ret = wasm.solid_boundaryEdges(this.__wbg_ptr, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Get the bounding box as [minX, minY, minZ, maxX, maxY, maxZ].
     * @returns {Float64Array}
     */
    boundingBox() {
        const ret = wasm.solid_boundingBox(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * Check if the solid can be exported to STEP format.
     *
     * Returns `true` if the solid has B-rep data available for STEP export.
     * Returns `false` for mesh-only or empty solids.
     * @returns {boolean}
     */
    canExportStep() {
        const ret = wasm.solid_canExportStep(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Get the center of mass as [x, y, z].
     * @returns {Float64Array}
     */
    centerOfMass() {
        const ret = wasm.solid_centerOfMass(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * Chamfer all edges of the solid by the given distance.
     *
     * Throws when the chamfer cannot be applied — the kernel would
     * otherwise hand back the unchamfered solid with no signal.
     * @param {number} distance
     * @returns {Solid}
     */
    chamfer(distance) {
        const ret = wasm.solid_chamfer(this.__wbg_ptr, distance);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Create a circular pattern of the solid around an axis.
     *
     * # Arguments
     *
     * * `axis_origin_x/y/z` - A point on the rotation axis
     * * `axis_dir_x/y/z` - Direction of the rotation axis
     * * `count` - Number of copies (including original)
     * * `angle_deg` - Total angle span in degrees
     * @param {number} axis_origin_x
     * @param {number} axis_origin_y
     * @param {number} axis_origin_z
     * @param {number} axis_dir_x
     * @param {number} axis_dir_y
     * @param {number} axis_dir_z
     * @param {number} count
     * @param {number} angle_deg
     * @returns {Solid}
     */
    circularPattern(axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, count, angle_deg) {
        const ret = wasm.solid_circularPattern(this.__wbg_ptr, axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, count, angle_deg);
        return Solid.__wrap(ret);
    }
    /**
     * Minimum signed distance to another solid in mm (see `WasmClearance`):
     * positive separation, negative penetration depth on intersection.
     * @param {Solid} other
     * @returns {any}
     */
    clearance(other) {
        _assertClass(other, Solid);
        const ret = wasm.solid_clearance(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Create a cone/frustum along Z axis.
     * @param {number} radius_bottom
     * @param {number} radius_top
     * @param {number} height
     * @param {number | null} [segments]
     * @returns {Solid}
     */
    static cone(radius_bottom, radius_top, height, segments) {
        const ret = wasm.solid_cone(radius_bottom, radius_top, height, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return Solid.__wrap(ret);
    }
    /**
     * Create a box with corner at origin and dimensions (sx, sy, sz).
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Solid}
     */
    static cube(sx, sy, sz) {
        const ret = wasm.solid_cube(sx, sy, sz);
        return Solid.__wrap(ret);
    }
    /**
     * Create a cylinder along Z axis with given radius and height.
     * @param {number} radius
     * @param {number} height
     * @param {number | null} [segments]
     * @returns {Solid}
     */
    static cylinder(radius, height, segments) {
        const ret = wasm.solid_cylinder(radius, height, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return Solid.__wrap(ret);
    }
    /**
     * Boolean difference (self − other).
     *
     * Returns a JS error (instead of trapping the WASM instance) when the
     * kernel reports a boolean failure.
     * @param {Solid} other
     * @returns {Solid}
     */
    difference(other) {
        _assertClass(other, Solid);
        const ret = wasm.solid_difference(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Per-edge blend on query-selected edges with a keyed profile.
     *
     * `spec_json` is a JSON object `{ "edges": EdgeQuery, "profile":
     * BlendProfile }` using the IR types (serde-tagged with `type`).
     * shape 0 = chamfer, 1 = fillet; size = chamfer leg / fillet radius.
     * @param {string} spec_json
     * @returns {Solid}
     */
    edgeBlend(spec_json) {
        const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_edgeBlend(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Create an empty solid.
     * @returns {Solid}
     */
    static empty() {
        const ret = wasm.solid_empty();
        return Solid.__wrap(ret);
    }
    /**
     * Create a solid by extruding a 2D sketch profile with twist and/or scale.
     *
     * Takes a sketch profile, extrusion direction, twist angle (radians),
     * and scale factor at the end (1.0 = no taper).
     * @param {string} profile_json
     * @param {Float64Array | number[]} direction
     * @param {number} twist_angle
     * @param {number} scale_end
     * @returns {Solid}
     */
    static extrudeWithOptions(profile_json, direction, twist_angle, scale_end) {
        const val3 = +twist_angle;
        const val4 = +scale_end;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_extrudeWithOptions(ptr0, len0, ptr1, len1, val3, val4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Create a solid by extruding a 2D sketch profile.
     *
     * Takes a sketch profile and extrusion direction as JS objects.
     * @param {string} profile_json
     * @param {Float64Array | number[]} direction
     * @returns {Solid}
     */
    static extrude(profile_json, direction) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_extrude(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Fillet all edges of the solid with the given radius.
     *
     * Throws when the fillet cannot be applied — a radius the geometry
     * can't host, a body with boolean holes, a mesh-only solid. The
     * alternative is a part that reaches a fabricator with square edges
     * where the design called for radii.
     * @param {number} radius
     * @returns {Solid}
     */
    fillet(radius) {
        const ret = wasm.solid_fillet(this.__wbg_ptr, radius);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Build a solid from STEP contents registered under `path`.
     *
     * This is how a `step_import` node evaluates where there is no
     * filesystem: the caller registers the bytes with `registerStepSource`,
     * and the node resolves to the real B-rep body — not a tessellation — so
     * analytic faces survive into booleans, fillets, and STEP export.
     *
     * `solidIndex` selects the body within the file (default 0). Errors
     * rather than returning empty geometry, so a missing registration is
     * visible instead of showing up later as a part that isn't there.
     * @param {string} path
     * @param {number | null} [solid_index]
     * @returns {Solid}
     */
    static fromRegisteredStep(path, solid_index) {
        const val2 = +(isLikeNone(solid_index) ? Number.MAX_SAFE_INTEGER : (solid_index) >>> 0);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_fromRegisteredStep(ptr0, len0, val2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Get the triangle mesh representation.
     *
     * Returns a JS object with `positions` (Float32Array) and `indices` (Uint32Array).
     *
     * Runs the tessellator output through
     * [`vcad_kernel_tessellate::render_bake`] so the emitted mesh carries
     * angle-based creased vertex normals. Every downstream renderer —
     * three.js today, wgpu / STL / GLB / ray tracer later — consumes this
     * same attribute layout without recomputing anything.
     * @param {number | null} [segments]
     * @returns {any}
     */
    getMesh(segments) {
        const ret = wasm.solid_getMesh(this.__wbg_ptr, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return ret;
    }
    /**
     * Generate a horizontal section view at a given Z height.
     *
     * Convenience method that creates a horizontal section plane.
     * @param {number} z
     * @param {number | null} [hatch_spacing]
     * @param {number | null} [hatch_angle]
     * @param {number | null} [segments]
     * @returns {any}
     */
    horizontalSection(z, hatch_spacing, hatch_angle, segments) {
        const ret = wasm.solid_horizontalSection(this.__wbg_ptr, z, !isLikeNone(hatch_spacing), isLikeNone(hatch_spacing) ? 0 : hatch_spacing, !isLikeNone(hatch_angle), isLikeNone(hatch_angle) ? 0 : hatch_angle, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return ret;
    }
    /**
     * Convex hull of a flat `[x, y, z, ...]` point cloud.
     * @param {Float64Array | number[]} points
     * @returns {Solid}
     */
    static hullPoints(points) {
        const ptr0 = passArrayF64ToWasm0(points, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_hullPoints(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Convex hull of this solid together with `other`. Hull is associative,
     * so an n-ary hull folds pairwise.
     * @param {Solid} other
     * @returns {Solid}
     */
    hullWith(other) {
        _assertClass(other, Solid);
        const ret = wasm.solid_hullWith(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Boolean intersection (self ∩ other).
     *
     * Returns a JS error (instead of trapping the WASM instance) when the
     * kernel reports a boolean failure.
     * @param {Solid} other
     * @returns {Solid}
     */
    intersection(other) {
        _assertClass(other, Solid);
        const ret = wasm.solid_intersection(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Check if the solid is empty (has no geometry).
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.solid_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * True when the solid's faces point inward (negative signed volume).
     * @returns {boolean}
     */
    isInsideOut() {
        const ret = wasm.solid_isInsideOut(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Create a linear pattern of the solid along a direction.
     *
     * # Arguments
     *
     * * `dir_x`, `dir_y`, `dir_z` - Direction vector
     * * `count` - Number of copies (including original)
     * * `spacing` - Distance between copies
     * @param {number} dir_x
     * @param {number} dir_y
     * @param {number} dir_z
     * @param {number} count
     * @param {number} spacing
     * @returns {Solid}
     */
    linearPattern(dir_x, dir_y, dir_z, count, spacing) {
        const ret = wasm.solid_linearPattern(this.__wbg_ptr, dir_x, dir_y, dir_z, count, spacing);
        return Solid.__wrap(ret);
    }
    /**
     * Create a solid by lofting between multiple profiles.
     *
     * Takes an array of sketch profiles (minimum 2).
     * @param {string} profiles_json
     * @param {boolean | null} [closed]
     * @returns {Solid}
     */
    static loft(profiles_json, closed) {
        const ptr0 = passStringToWasm0(profiles_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_loft(ptr0, len0, isLikeNone(closed) ? 0xFFFFFF : closed ? 1 : 0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * This solid with the coplanar fragments its booleans left merged
     * back into single faces (`vcad_kernel::Solid::merge_coplanar_faces`):
     * one face per flat region, for display, picking and export.
     *
     * For a finished part only. Keep the unmerged solid for anything that
     * runs a further boolean on it — the splitters are tuned on the faces
     * a boolean produces, and `evaluateDocument` merges at the same point
     * (a root's exit) for the same reason. Returns an unchanged copy when
     * nothing merges or the merged solid would tessellate any worse.
     * @returns {Solid}
     */
    mergeCoplanarFaces() {
        const ret = wasm.solid_mergeCoplanarFaces(this.__wbg_ptr);
        return Solid.__wrap(ret);
    }
    /**
     * Mirror the solid across a plane through `(origin_x, origin_y, origin_z)`
     * with the given plane normal. Triangle / face winding is automatically
     * reversed to preserve outward normals.
     * @param {number} origin_x
     * @param {number} origin_y
     * @param {number} origin_z
     * @param {number} normal_x
     * @param {number} normal_y
     * @param {number} normal_z
     * @returns {Solid}
     */
    mirror(origin_x, origin_y, origin_z, normal_x, normal_y, normal_z) {
        const ret = wasm.solid_mirror(this.__wbg_ptr, origin_x, origin_y, origin_z, normal_x, normal_y, normal_z);
        return Solid.__wrap(ret);
    }
    /**
     * Get the number of triangles in the tessellated mesh.
     * @returns {number}
     */
    numTriangles() {
        const ret = wasm.solid_numTriangles(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Create a regular n-gonal right prism centered on Z.
     * @param {number} sides
     * @param {number} radius
     * @param {number} height
     * @returns {Solid}
     */
    static prism(sides, radius, height) {
        const ret = wasm.solid_prism(sides, radius, height);
        return Solid.__wrap(ret);
    }
    /**
     * Project the solid to a 2D view for technical drawing.
     *
     * # Arguments
     * * `view_direction` - View direction: "front", "back", "top", "bottom", "left", "right", or "isometric"
     * * `segments` - Number of segments for tessellation (optional, default 32)
     *
     * # Returns
     * A JS object containing the projected view with edges and bounds.
     * @param {string} view_direction
     * @param {number | null} [segments]
     * @returns {any}
     */
    projectView(view_direction, segments) {
        const val2 = +(isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        const ptr0 = passStringToWasm0(view_direction, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_projectView(this.__wbg_ptr, ptr0, len0, val2);
        return ret;
    }
    /**
     * Create a solid by revolving a 2D sketch profile around an axis.
     *
     * Takes a sketch profile, axis origin, axis direction, and angle in degrees.
     * @param {string} profile_json
     * @param {Float64Array | number[]} axis_origin
     * @param {Float64Array | number[]} axis_dir
     * @param {number} angle_deg
     * @returns {Solid}
     */
    static revolve(profile_json, axis_origin, axis_dir, angle_deg) {
        const val4 = +angle_deg;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(axis_origin, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayF64ToWasm0(axis_dir, wasm.__wbindgen_malloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_revolve(ptr0, len0, ptr1, len1, ptr2, len2, val4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Rotate the solid by angles in degrees around X, Y, Z axes.
     * @param {number} x_deg
     * @param {number} y_deg
     * @param {number} z_deg
     * @returns {Solid}
     */
    rotate(x_deg, y_deg, z_deg) {
        const ret = wasm.solid_rotate(this.__wbg_ptr, x_deg, y_deg, z_deg);
        return Solid.__wrap(ret);
    }
    /**
     * Run DFM directly on this solid's BRep.
     *
     * Returns the report JSON; if the solid is mesh-only (e.g. after
     * a boolean — see issue #186), the report has an empty `issues`
     * array and a note in `rule_pack_name`.
     *
     * `root_node_id` (when > 0) attributes every face in the BRep to
     * that IR node — the v1 coarse provenance heuristic. Pass 0 to
     * skip provenance entirely; emitted issues will then carry
     * `origin_op: null` and `dfm_apply_fix` will only be able to act
     * on rules whose fix kind is `manual`.
     * @param {string} process
     * @param {string} rule_pack_toml
     * @param {bigint} root_node_id
     * @returns {string}
     */
    runDfm(process, rule_pack_toml, root_node_id) {
        let deferred5_0;
        let deferred5_1;
        try {
            const val3 = BigInt.asIntN(64, root_node_id);
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(process, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(rule_pack_toml, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.solid_runDfm(this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
            var ptr4 = ret[0];
            var len4 = ret[1];
            if (ret[3]) {
                ptr4 = 0; len4 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred5_0 = ptr4;
            deferred5_1 = len4;
            return getStringFromWasm0(ptr4, len4);
        } finally {
            wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
        }
    }
    /**
     * Scale the solid by (x, y, z).
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {Solid}
     */
    scale(x, y, z) {
        const ret = wasm.solid_scale(this.__wbg_ptr, x, y, z);
        return Solid.__wrap(ret);
    }
    /**
     * Generate a section view by cutting the solid with a plane.
     *
     * # Arguments
     * * `plane_json` - JSON string with plane definition: `{"origin": [x,y,z], "normal": [x,y,z], "up": [x,y,z]}`
     * * `hatch_json` - Optional JSON string with hatch pattern: `{"spacing": f64, "angle": f64}`
     * * `segments` - Number of segments for tessellation (optional, default 32)
     *
     * # Returns
     * A JS object containing the section view with curves, hatch lines, and bounds.
     * @param {string} plane_json
     * @param {string | null} [hatch_json]
     * @param {number | null} [segments]
     * @returns {any}
     */
    sectionView(plane_json, hatch_json, segments) {
        const val3 = +(isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(hatch_json) ? 0 : passStringToWasm0(hatch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_sectionView(this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
        return ret;
    }
    /**
     * Shell with faces removed: hollow inward by `thickness` and leave
     * the referenced faces as the opening (an open-top box).
     * `open_faces_json` is a JSON array of IR `FaceRef`s
     * (`{name}` and/or `{point:{x,y,z}, normal:{x,y,z}}`). An empty array
     * is the closed shell.
     * @param {number} thickness
     * @param {string} open_faces_json
     * @returns {Solid}
     */
    shellOpen(thickness, open_faces_json) {
        const val2 = +thickness;
        const ptr0 = passStringToWasm0(open_faces_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_shellOpen(this.__wbg_ptr, val2, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Shell (hollow) the solid by offsetting all faces inward.
     * @param {number} thickness
     * @returns {Solid}
     */
    shell(thickness) {
        const ret = wasm.solid_shell(this.__wbg_ptr, thickness);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Signed volume: positive for an outward-facing solid, negative when it
     * is inside out.
     * @returns {number}
     */
    signedVolume() {
        const ret = wasm.solid_signedVolume(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a sphere centered at origin with given radius.
     * @param {number} radius
     * @param {number | null} [segments]
     * @returns {Solid}
     */
    static sphere(radius, segments) {
        const ret = wasm.solid_sphere(radius, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return Solid.__wrap(ret);
    }
    /**
     * Create an involute spur gear (the `SpurGear` IR node): ISO full-depth
     * teeth, base at z = 0, tooth 0 centred on +X, optional centred bore.
     * @param {number} module
     * @param {number} teeth
     * @param {number} pressure_angle_deg
     * @param {number} face_width
     * @param {number} bore_diameter
     * @param {number} backlash
     * @returns {Solid}
     */
    static spurGear(module, teeth, pressure_angle_deg, face_width, bore_diameter, backlash) {
        const ret = wasm.solid_spurGear(module, teeth, pressure_angle_deg, face_width, bore_diameter, backlash);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Compute the surface area of the solid.
     * @returns {number}
     */
    surfaceArea() {
        const ret = wasm.solid_surfaceArea(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a solid by sweeping a profile along a helix path.
     *
     * Takes a sketch profile and helix parameters.
     * @param {string} profile_json
     * @param {number} radius
     * @param {number} pitch
     * @param {number} height
     * @param {number} turns
     * @param {number | null} [twist_angle]
     * @param {number | null} [scale_start]
     * @param {number | null} [scale_end]
     * @param {number | null} [path_segments]
     * @param {number | null} [arc_segments]
     * @param {number | null} [orientation]
     * @returns {Solid}
     */
    static sweepHelix(profile_json, radius, pitch, height, turns, twist_angle, scale_start, scale_end, path_segments, arc_segments, orientation) {
        const val2 = +radius;
        const val3 = +pitch;
        const val4 = +height;
        const val5 = +turns;
        const val6 = +(isLikeNone(twist_angle) ? 0 : twist_angle);
        const val7 = +(isLikeNone(scale_start) ? 0 : scale_start);
        const val8 = +(isLikeNone(scale_end) ? 0 : scale_end);
        const val9 = +(isLikeNone(path_segments) ? Number.MAX_SAFE_INTEGER : (path_segments) >>> 0);
        const val10 = +(isLikeNone(arc_segments) ? Number.MAX_SAFE_INTEGER : (arc_segments) >>> 0);
        const val11 = +(isLikeNone(orientation) ? 0 : orientation);
        const ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.solid_sweepHelix(ptr0, len0, val2, val3, val4, val5, !isLikeNone(twist_angle), val6, !isLikeNone(scale_start), val7, !isLikeNone(scale_end), val8, val9, val10, !isLikeNone(orientation), val11);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Create a solid by sweeping a profile along a line path.
     *
     * Takes a sketch profile and path endpoints.
     * @param {string} profile_json
     * @param {Float64Array | number[]} start
     * @param {Float64Array | number[]} end
     * @param {number | null} [twist_angle]
     * @param {number | null} [scale_start]
     * @param {number | null} [scale_end]
     * @param {number | null} [orientation]
     * @returns {Solid}
     */
    static sweepLine(profile_json, start, end, twist_angle, scale_start, scale_end, orientation) {
        const val4 = +(isLikeNone(twist_angle) ? 0 : twist_angle);
        const val5 = +(isLikeNone(scale_start) ? 0 : scale_start);
        const val6 = +(isLikeNone(scale_end) ? 0 : scale_end);
        const val7 = +(isLikeNone(orientation) ? 0 : orientation);
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(start, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayF64ToWasm0(end, wasm.__wbindgen_malloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_sweepLine(ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(twist_angle), val4, !isLikeNone(scale_start), val5, !isLikeNone(scale_end), val6, !isLikeNone(orientation), val7);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Swept volume: union of this solid rotated about an axis over
     * `[deg_lo, deg_hi]`. `step_deg <= 0` picks the step automatically;
     * `clearance` (mm) dilates the solid first. Triangle-soup result,
     * meant as a clearance-cut tool.
     * @param {number} axis_origin_x
     * @param {number} axis_origin_y
     * @param {number} axis_origin_z
     * @param {number} axis_dir_x
     * @param {number} axis_dir_y
     * @param {number} axis_dir_z
     * @param {number} deg_lo
     * @param {number} deg_hi
     * @param {number} step_deg
     * @param {number} clearance
     * @returns {Solid}
     */
    sweepRotate(axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, deg_lo, deg_hi, step_deg, clearance) {
        const ret = wasm.solid_sweepRotate(this.__wbg_ptr, axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, deg_lo, deg_hi, step_deg, clearance);
        return Solid.__wrap(ret);
    }
    /**
     * Create a solid by extruding text as 2D profiles.
     *
     * Converts text to sketch profiles and extrudes them. Each character glyph
     * becomes a separate profile, and holes (like in 'O') are subtracted.
     *
     * # Arguments
     *
     * * `text` - The text string to convert
     * * `origin` - Origin point [x, y, z]
     * * `x_dir` - X direction vector [x, y, z]
     * * `y_dir` - Y direction vector [x, y, z]
     * * `direction` - Extrusion direction [x, y, z] (magnitude = extrusion depth)
     * * `height` - Text height in mm
     * * `font` - Font name (currently only "sans-serif" supported)
     * * `alignment` - Text alignment: "left", "center", or "right"
     * * `letter_spacing` - Letter spacing multiplier (1.0 = normal)
     * * `line_spacing` - Line spacing multiplier (1.0 = normal)
     * @param {string} text
     * @param {Float64Array | number[]} origin
     * @param {Float64Array | number[]} x_dir
     * @param {Float64Array | number[]} y_dir
     * @param {Float64Array | number[]} direction
     * @param {number} height
     * @param {string | null} [font]
     * @param {string | null} [alignment]
     * @param {number | null} [letter_spacing]
     * @param {number | null} [line_spacing]
     * @returns {Solid}
     */
    static textExtrude(text, origin, x_dir, y_dir, direction, height, font, alignment, letter_spacing, line_spacing) {
        const val8 = +height;
        const val9 = +(isLikeNone(letter_spacing) ? 0 : letter_spacing);
        const val10 = +(isLikeNone(line_spacing) ? 0 : line_spacing);
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6;
        try {
            ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayF64ToWasm0(origin, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passArrayF64ToWasm0(x_dir, wasm.__wbindgen_malloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passArrayF64ToWasm0(y_dir, wasm.__wbindgen_malloc);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
            len4 = WASM_VECTOR_LEN;
            ptr5 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len5 = WASM_VECTOR_LEN;
            ptr6 = isLikeNone(alignment) ? 0 : passStringToWasm0(alignment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len6 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr6) { wasm.__wbindgen_free(ptr6, len6 * 1, 1); }
            if (ptr5) { wasm.__wbindgen_free(ptr5, len5 * 1, 1); }
            if (ptr4) { wasm.__wbindgen_free(ptr4, len4 * 8, 8); }
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 8, 8); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solid_textExtrude(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, val8, ptr5, len5, ptr6, len6, !isLikeNone(letter_spacing), val9, !isLikeNone(line_spacing), val10);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Export the solid to STEP format.
     *
     * # Returns
     * A byte buffer containing the STEP file data.
     *
     * # Errors
     * Returns an error if the solid has no B-rep data (e.g., mesh-only after certain operations).
     * @returns {Uint8Array}
     */
    toStepBuffer() {
        const ret = wasm.solid_toStepBuffer(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Create a torus centered at origin with axis along Z.
     * @param {number} major_radius
     * @param {number} minor_radius
     * @param {number | null} [segments]
     * @returns {Solid}
     */
    static torus(major_radius, minor_radius, segments) {
        const ret = wasm.solid_torus(major_radius, minor_radius, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
        return Solid.__wrap(ret);
    }
    /**
     * Translate the solid by (x, y, z).
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {Solid}
     */
    translate(x, y, z) {
        const ret = wasm.solid_translate(this.__wbg_ptr, x, y, z);
        return Solid.__wrap(ret);
    }
    /**
     * Boolean union (self ∪ other).
     *
     * Returns a JS error (instead of trapping the WASM instance) when the
     * kernel reports a boolean failure.
     * @param {Solid} other
     * @returns {Solid}
     */
    union(other) {
        _assertClass(other, Solid);
        const ret = wasm.solid_union(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Solid.__wrap(ret[0]);
    }
    /**
     * Compute the volume of the solid.
     * @returns {number}
     */
    volume() {
        const ret = wasm.solid_volume(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a right-triangular-prism wedge with corner at origin.
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     * @returns {Solid}
     */
    static wedge(sx, sy, sz) {
        const ret = wasm.solid_wedge(sx, sy, sz);
        return Solid.__wrap(ret);
    }
}
if (Symbol.dispose) Solid.prototype[Symbol.dispose] = Solid.prototype.free;

/**
 * Annotation layer for dimension annotations.
 *
 * This class provides methods for creating and rendering dimension annotations
 * on 2D projected views.
 */
export class WasmAnnotationLayer {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmAnnotationLayerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmannotationlayer_free(ptr, 0);
    }
    /**
     * Add an aligned dimension between two points.
     *
     * The dimension line is parallel to the line connecting the two points.
     *
     * # Arguments
     * * `x1`, `y1` - First point coordinates
     * * `x2`, `y2` - Second point coordinates
     * * `offset` - Distance from points to dimension line
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} offset
     */
    addAlignedDimension(x1, y1, x2, y2, offset) {
        wasm.wasmannotationlayer_addAlignedDimension(this.__wbg_ptr, x1, y1, x2, y2, offset);
    }
    /**
     * Add an angular dimension between three points.
     *
     * The angle is measured at the vertex (middle point).
     *
     * # Arguments
     * * `x1`, `y1` - First point on one leg
     * * `vx`, `vy` - Vertex point (angle measured here)
     * * `x2`, `y2` - Second point on other leg
     * * `arc_radius` - Radius of the arc showing the angle
     * @param {number} x1
     * @param {number} y1
     * @param {number} vx
     * @param {number} vy
     * @param {number} x2
     * @param {number} y2
     * @param {number} arc_radius
     */
    addAngleDimension(x1, y1, vx, vy, x2, y2, arc_radius) {
        wasm.wasmannotationlayer_addAngleDimension(this.__wbg_ptr, x1, y1, vx, vy, x2, y2, arc_radius);
    }
    /**
     * Add a diameter dimension for a circle.
     *
     * # Arguments
     * * `cx`, `cy` - Center of the circle
     * * `radius` - Radius of the circle
     * * `leader_angle` - Angle in radians for the leader line direction
     * @param {number} cx
     * @param {number} cy
     * @param {number} radius
     * @param {number} leader_angle
     */
    addDiameterDimension(cx, cy, radius, leader_angle) {
        wasm.wasmannotationlayer_addDiameterDimension(this.__wbg_ptr, cx, cy, radius, leader_angle);
    }
    /**
     * Add a horizontal dimension between two points.
     *
     * # Arguments
     * * `x1`, `y1` - First point coordinates
     * * `x2`, `y2` - Second point coordinates
     * * `offset` - Distance from points to dimension line (positive = above)
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} offset
     */
    addHorizontalDimension(x1, y1, x2, y2, offset) {
        wasm.wasmannotationlayer_addHorizontalDimension(this.__wbg_ptr, x1, y1, x2, y2, offset);
    }
    /**
     * Add a radius dimension for a circle.
     *
     * # Arguments
     * * `cx`, `cy` - Center of the circle
     * * `radius` - Radius of the circle
     * * `leader_angle` - Angle in radians for the leader line direction
     * @param {number} cx
     * @param {number} cy
     * @param {number} radius
     * @param {number} leader_angle
     */
    addRadiusDimension(cx, cy, radius, leader_angle) {
        wasm.wasmannotationlayer_addRadiusDimension(this.__wbg_ptr, cx, cy, radius, leader_angle);
    }
    /**
     * Add a vertical dimension between two points.
     *
     * # Arguments
     * * `x1`, `y1` - First point coordinates
     * * `x2`, `y2` - Second point coordinates
     * * `offset` - Distance from points to dimension line (positive = right)
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} offset
     */
    addVerticalDimension(x1, y1, x2, y2, offset) {
        wasm.wasmannotationlayer_addVerticalDimension(this.__wbg_ptr, x1, y1, x2, y2, offset);
    }
    /**
     * Get the number of annotations in the layer.
     * @returns {number}
     */
    annotationCount() {
        const ret = wasm.wasmannotationlayer_annotationCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Clear all annotations from the layer.
     */
    clear() {
        wasm.wasmannotationlayer_clear(this.__wbg_ptr);
    }
    /**
     * Check if the layer has any annotations.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.wasmannotationlayer_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Create a new empty annotation layer.
     */
    constructor() {
        const ret = wasm.wasmannotationlayer_new();
        this.__wbg_ptr = ret;
        WasmAnnotationLayerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Render all dimensions and return as JSON.
     *
     * Returns an array of rendered dimensions, each containing:
     * - `lines`: Array of line segments [[x1, y1], [x2, y2]]
     * - `arcs`: Array of arc definitions
     * - `arrows`: Array of arrow definitions
     * - `texts`: Array of text labels
     *
     * # Arguments
     * * `view_json` - Optional JSON string of a ProjectedView for geometry resolution
     * @param {string | null} [view_json]
     * @returns {any}
     */
    renderAll(view_json) {
        var ptr0 = isLikeNone(view_json) ? 0 : passStringToWasm0(view_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmannotationlayer_renderAll(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
}
if (Symbol.dispose) WasmAnnotationLayer.prototype[Symbol.dispose] = WasmAnnotationLayer.prototype.free;

/**
 * CAM settings for WASM.
 */
export class WasmCamSettings {
    static __wrap(ptr) {
        const obj = Object.create(WasmCamSettings.prototype);
        obj.__wbg_ptr = ptr;
        WasmCamSettingsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmCamSettingsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcamsettings_free(ptr, 0);
    }
    /**
     * Feed rate (mm/min).
     * @returns {number}
     */
    get feed_rate() {
        const ret = wasm.__wbg_get_wasmcamsettings_feed_rate(this.__wbg_ptr);
        return ret;
    }
    /**
     * Plunge rate (mm/min).
     * @returns {number}
     */
    get plunge_rate() {
        const ret = wasm.__wbg_get_wasmcamsettings_plunge_rate(this.__wbg_ptr);
        return ret;
    }
    /**
     * Retract Z height (mm).
     * @returns {number}
     */
    get retract_z() {
        const ret = wasm.__wbg_get_wasmcamsettings_retract_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * Safe Z height (mm).
     * @returns {number}
     */
    get safe_z() {
        const ret = wasm.__wbg_get_wasmcamsettings_safe_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * Spindle RPM.
     * @returns {number}
     */
    get spindle_rpm() {
        const ret = wasm.__wbg_get_wasmcamsettings_spindle_rpm(this.__wbg_ptr);
        return ret;
    }
    /**
     * Stepdown distance (mm).
     * @returns {number}
     */
    get stepdown() {
        const ret = wasm.__wbg_get_wasmcamsettings_stepdown(this.__wbg_ptr);
        return ret;
    }
    /**
     * Stepover distance (mm).
     * @returns {number}
     */
    get stepover() {
        const ret = wasm.__wbg_get_wasmcamsettings_stepover(this.__wbg_ptr);
        return ret;
    }
    /**
     * Feed rate (mm/min).
     * @param {number} arg0
     */
    set feed_rate(arg0) {
        wasm.__wbg_set_wasmcamsettings_feed_rate(this.__wbg_ptr, arg0);
    }
    /**
     * Plunge rate (mm/min).
     * @param {number} arg0
     */
    set plunge_rate(arg0) {
        wasm.__wbg_set_wasmcamsettings_plunge_rate(this.__wbg_ptr, arg0);
    }
    /**
     * Retract Z height (mm).
     * @param {number} arg0
     */
    set retract_z(arg0) {
        wasm.__wbg_set_wasmcamsettings_retract_z(this.__wbg_ptr, arg0);
    }
    /**
     * Safe Z height (mm).
     * @param {number} arg0
     */
    set safe_z(arg0) {
        wasm.__wbg_set_wasmcamsettings_safe_z(this.__wbg_ptr, arg0);
    }
    /**
     * Spindle RPM.
     * @param {number} arg0
     */
    set spindle_rpm(arg0) {
        wasm.__wbg_set_wasmcamsettings_spindle_rpm(this.__wbg_ptr, arg0);
    }
    /**
     * Stepdown distance (mm).
     * @param {number} arg0
     */
    set stepdown(arg0) {
        wasm.__wbg_set_wasmcamsettings_stepdown(this.__wbg_ptr, arg0);
    }
    /**
     * Stepover distance (mm).
     * @param {number} arg0
     */
    set stepover(arg0) {
        wasm.__wbg_set_wasmcamsettings_stepover(this.__wbg_ptr, arg0);
    }
    /**
     * Create from JSON.
     * @param {string} json
     * @returns {WasmCamSettings}
     */
    static fromJson(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcamsettings_fromJson(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmCamSettings.__wrap(ret[0]);
    }
    /**
     * Create default CAM settings.
     */
    constructor() {
        const ret = wasm.wasmcamsettings_new();
        this.__wbg_ptr = ret;
        WasmCamSettingsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) WasmCamSettings.prototype[Symbol.dispose] = WasmCamSettings.prototype.free;

/**
 * CRDT-backed document engine for WASM.
 *
 * Wraps a `DocumentApi` (which wraps a `CrdtDocument`) and exposes both
 * typed mutations via `add_feature(json)` and legacy low-level CRDT methods.
 */
export class WasmDocumentEngine {
    static __wrap(ptr) {
        const obj = Object.create(WasmDocumentEngine.prototype);
        obj.__wbg_ptr = ptr;
        WasmDocumentEngineFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmDocumentEngineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmdocumentengine_free(ptr, 0);
    }
    /**
     * Add a feature from a JSON-serialized `FeatureInput` discriminated union.
     *
     * Example: `{"type":"Cube","size_x":10,"size_y":20,"size_z":30}`
     *
     * Returns `{ document, parts, consumedPartIds, createdFeatureId }`.
     * @param {string} input_json
     * @returns {any}
     */
    add_feature(input_json) {
        const ptr0 = passStringToWasm0(input_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_add_feature(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * `apply`, answered with an `EngineDeltaEnvelope` (what changed since
     * the state before the command) instead of the whole document.
     * @param {string} command_json
     * @returns {string}
     */
    applyDelta(command_json) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(command_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmdocumentengine_applyDelta(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * `apply_tool`, answered with an `EngineDeltaEnvelope`.
     * @param {string} tool
     * @param {string} args_json
     * @returns {string}
     */
    applyToolDelta(tool, args_json) {
        let deferred3_0;
        let deferred3_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(tool, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.wasmdocumentengine_applyToolDelta(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            deferred3_0 = ret[0];
            deferred3_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Apply a JSON `DocCommand` (see `vcad_app::command`). Returns the
     * shared JSON envelope: `{"ok":true,"result":{…}}` or
     * `{"ok":false,"error":{"kind":…,"message":…}}`. Unlike the per-method
     * calls, unknown ids and malformed input are reported, not ignored.
     * @param {string} command_json
     * @returns {string}
     */
    apply(command_json) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(command_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmdocumentengine_apply(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Lower an AI tool call (`create`, `translate`, `linear_pattern`, …)
     * to a `DocCommand` in Rust and apply it. Same envelope as `apply`;
     * tools the engine can't lower yet report `{"kind":"unsupported"}`.
     * @param {string} tool
     * @param {string} args_json
     * @returns {string}
     */
    apply_tool(tool, args_json) {
        let deferred3_0;
        let deferred3_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(tool, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.wasmdocumentengine_apply_tool(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            deferred3_0 = ret[0];
            deferred3_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Whether redo is available.
     * @returns {boolean}
     */
    can_redo() {
        const ret = wasm.wasmdocumentengine_can_redo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether undo is available.
     * @returns {boolean}
     */
    can_undo() {
        const ret = wasm.wasmdocumentengine_can_undo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Compute a FractionalIndex position between two neighbor feature IDs.
     * @param {string} before_id_json
     * @param {string} after_id_json
     * @returns {string}
     */
    compute_position_between(before_id_json, after_id_json) {
        let deferred3_0;
        let deferred3_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(before_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(after_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.wasmdocumentengine_compute_position_between(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            deferred3_0 = ret[0];
            deferred3_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Create a feature with the given kind and params (JSON string).
     *
     * Returns `{ document, parts, createdFeatureId }` as a JsValue.
     * @param {string} kind
     * @param {string} params_json
     * @returns {any}
     */
    create_feature(kind, params_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_create_feature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Delete a feature by ID (JSON string).
     * @param {string} feature_id_json
     * @returns {any}
     */
    delete_feature(feature_id_json) {
        const ptr0 = passStringToWasm0(feature_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_delete_feature(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Delete a feature by stable ID.
     * @param {string} stable_id
     * @returns {any}
     */
    delete_feature_by_id(stable_id) {
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_delete_feature_by_id(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Evaluate this engine's document through `evaluator` without a JSON
     * round trip: the materialized document never leaves Rust. `overlay_json`
     * is `{"parameters"?, "bindings"?}` (host-held parameter state, merged
     * over the document like `mergeParametersIntoDocument`); pass `""` for
     * none. Returns the same scene shape as `evaluateDocument`.
     * @param {IncrementalEvaluator} evaluator
     * @param {string} overlay_json
     * @param {boolean} skip_clash_detection
     * @returns {any}
     */
    evaluateIncremental(evaluator, overlay_json, skip_clash_detection) {
        _assertClass(evaluator, IncrementalEvaluator);
        const val2 = +skip_clash_detection;
        const ptr0 = passStringToWasm0(overlay_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_evaluateIncremental(this.__wbg_ptr, evaluator.__wbg_ptr, ptr0, len0, val2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Load a legacy v1 JSON document and migrate to CRDT.
     * @param {string} json
     * @returns {WasmDocumentEngine}
     */
    static from_v1_json(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_from_v1_json(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmDocumentEngine.__wrap(ret[0]);
    }
    /**
     * Get the materialized document as JSON.
     * @returns {string}
     */
    get_document_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_get_document_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get operations since a remote clock state (JSON).
     * @param {string} remote_clock_json
     * @returns {string}
     */
    get_ops_since(remote_clock_json) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(remote_clock_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmdocumentengine_get_ops_since(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Get ordered features (for the feature tree) as JSON.
     * @returns {string}
     */
    get_ordered_features_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_get_ordered_features_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get the parts list as JSON.
     * @returns {string}
     */
    get_parts_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_get_parts_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get the sync clock as JSON.
     * @returns {string}
     */
    get_sync_clock() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_get_sync_clock(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Import IR JSON into the current document (e.g. AI-generated geometry).
     * @param {string} ir_json
     * @returns {any}
     */
    import_ir(ir_json) {
        const ptr0 = passStringToWasm0(ir_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_import_ir(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Load a document from bytes.
     *
     * Auto-detects format: if CRDT (v2), loads directly; if legacy JSON (v1),
     * migrates to CRDT first.
     * @param {Uint8Array | number[]} bytes
     * @returns {WasmDocumentEngine}
     */
    static load(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_load(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmDocumentEngine.__wrap(ret[0]);
    }
    /**
     * Merge remote operations (JSON array of Op).
     * @param {string} ops_json
     * @returns {any}
     */
    merge_remote(ops_json) {
        const ptr0 = passStringToWasm0(ops_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_merge_remote(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Move a feature to a new position.
     * @param {string} feature_id_json
     * @param {string} position_json
     * @returns {any}
     */
    move_feature(feature_id_json, position_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(feature_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(position_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_move_feature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Create a new empty document engine.
     */
    constructor() {
        const ret = wasm.wasmdocumentengine_new();
        this.__wbg_ptr = ret;
        WasmDocumentEngineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Redo the last undone action.
     * @returns {any}
     */
    redo() {
        const ret = wasm.wasmdocumentengine_redo(this.__wbg_ptr);
        return ret;
    }
    /**
     * Rewrite v1 parameter-binding keys onto this engine's node ids.
     *
     * Bindings are stored outside the CRDT as `"<nodeId>:<fieldPath>"` keyed
     * on v1 node ids. Migration renumbers every node, so a binding loaded
     * verbatim points at an arbitrary node in the rebuilt document — the
     * symptom being a `radius` binding landing on a `Scale` wrapper and
     * failing the whole document's evaluation.
     *
     * Returns `{ bindings, dropped }`. Bindings whose node did not survive
     * are dropped with a reason rather than carried forward, because one
     * dangling key costs the user every other binding in the document.
     * Engines not built from a v1 migration return the input unchanged —
     * a CRDT-native load already has matching ids.
     * @param {string} bindings_json
     * @returns {any}
     */
    remapBindings(bindings_json) {
        const ptr0 = passStringToWasm0(bindings_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_remapBindings(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Rename a feature.
     * @param {string} stable_id
     * @param {string} name
     * @returns {any}
     */
    rename_feature(stable_id, name) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_rename_feature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Save the document to bytes.
     * @returns {Uint8Array}
     */
    save() {
        const ret = wasm.wasmdocumentengine_save(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Set joint state.
     * @param {string} stable_id
     * @param {number} state
     * @returns {any}
     */
    set_joint_state(stable_id, state) {
        const val2 = +state;
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_set_joint_state(this.__wbg_ptr, ptr0, len0, val2);
        return ret;
    }
    /**
     * Set material on a feature.
     * @param {string} stable_id
     * @param {string} material
     * @returns {any}
     */
    set_material(stable_id, material) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(material, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_set_material(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Set a parameter on a feature.
     * @param {string} feature_id_json
     * @param {string} key
     * @param {string} value_json
     * @returns {any}
     */
    set_param(feature_id_json, key, value_json) {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(feature_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(value_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_set_param(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * Set rotation on a feature.
     * @param {string} stable_id
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {any}
     */
    set_rotation(stable_id, x, y, z) {
        const val2 = +x;
        const val3 = +y;
        const val4 = +z;
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_set_rotation(this.__wbg_ptr, ptr0, len0, val2, val3, val4);
        return ret;
    }
    /**
     * Set scale on a feature.
     * @param {string} stable_id
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {any}
     */
    set_scale(stable_id, x, y, z) {
        const val2 = +x;
        const val3 = +y;
        const val4 = +z;
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_set_scale(this.__wbg_ptr, ptr0, len0, val2, val3, val4);
        return ret;
    }
    /**
     * Set translation on a feature.
     * @param {string} stable_id
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {any}
     */
    set_translation(stable_id, x, y, z) {
        const val2 = +x;
        const val3 = +y;
        const val4 = +z;
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_set_translation(this.__wbg_ptr, ptr0, len0, val2, val3, val4);
        return ret;
    }
    /**
     * Set visibility on a feature.
     * @param {string} stable_id
     * @param {boolean} visible
     * @returns {any}
     */
    set_visible(stable_id, visible) {
        const val2 = +visible;
        const ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmdocumentengine_set_visible(this.__wbg_ptr, ptr0, len0, val2);
        return ret;
    }
    /**
     * The current state as a full-document envelope (always `ok`) — the
     * base a host applies deltas to.
     * @returns {string}
     */
    stateEnvelope() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_stateEnvelope(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Deterministic state fingerprint; matches `vcad_engine_state_hash`.
     * @returns {string}
     */
    stateHash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmdocumentengine_stateHash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Undo the last action.
     * @returns {any}
     */
    undo() {
        const ret = wasm.wasmdocumentengine_undo(this.__wbg_ptr);
        return ret;
    }
    /**
     * Update a feature with new params from a JSON-serialized `FeatureInput`.
     * @param {string} stable_id
     * @param {string} input_json
     * @returns {any}
     */
    update_feature(stable_id, input_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(stable_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(input_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmdocumentengine_update_feature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Create an empty engine with a fixed replica id (deterministic stable
     * ids — used by the parity harness and by hosts that persist replicas).
     * @param {number} replica_id
     * @returns {WasmDocumentEngine}
     */
    static withReplica(replica_id) {
        const ret = wasm.wasmdocumentengine_withReplica(replica_id);
        return WasmDocumentEngine.__wrap(ret);
    }
}
if (Symbol.dispose) WasmDocumentEngine.prototype[Symbol.dispose] = WasmDocumentEngine.prototype.free;

export class WasmKeybindings {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmKeybindingsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmkeybindings_free(ptr, 0);
    }
    /**
     * Return the effective chord (user override or default) for a command
     * id, or `None` if disabled / unbound.
     * @param {string} id
     * @returns {string | undefined}
     */
    chordFor(id) {
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmkeybindings_chordFor(this.__wbg_ptr, ptr0, len0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getStringFromWasm0(ret[0], ret[1]);
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v2;
    }
    /**
     * Returns a JSON array describing every registered command. The TS UI
     * (command palette, keyboard prefs) reads this once at startup.
     *
     * Each entry is a `CommandView` — a flattened, owned projection of
     * `Command` that serde can serialize (the source struct uses `&'static
     * str` and a non-serializable `ModeScope` enum).
     * @returns {string}
     */
    commandsJson() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmkeybindings_commandsJson(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Report binding conflicts in the given mode: pairs of commands that
     * share the same chord. Returns a JSON array for the prefs UI to
     * highlight.
     * @param {string} mode_name
     * @returns {string}
     */
    conflictsJson(mode_name) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(mode_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmkeybindings_conflictsJson(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Load overrides previously returned by [`Self::save_overrides`]. Malformed
     * entries are skipped — the caller never sees a parse failure for
     * stale config.
     * @param {string} json
     * @returns {boolean}
     */
    loadOverrides(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmkeybindings_loadOverrides(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Construct a fresh registry with all default bindings.
     */
    constructor() {
        const ret = wasm.wasmkeybindings_new();
        this.__wbg_ptr = ret;
        WasmKeybindingsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Clear all user overrides, restoring default bindings.
     */
    resetAll() {
        wasm.wasmkeybindings_resetAll(this.__wbg_ptr);
    }
    /**
     * Resolve a chord to a command id.
     *
     * - `chord_json` is the JSON-serialized [`Chord`] produced by the TS
     *   adapter (`chord.ts` normalizes `KeyboardEvent` → `Chord`).
     * - `mode_name` is one of `"Normal" | "Sketch" | "Assembly" | ...`
     *   (see [`AppMode`]).
     * - `ctx_bits` is the packed u32 from [`WhenContext::bits`].
     *
     * Returns the command id on match, or `None` — the TS side checks for
     * `null` and falls through if nothing binds.
     * @param {string} chord_json
     * @param {string} mode_name
     * @param {number} ctx_bits
     * @returns {string | undefined}
     */
    resolve(chord_json, mode_name, ctx_bits) {
        const val3 = +ctx_bits;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(chord_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(mode_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.wasmkeybindings_resolve(this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
        let v4;
        if (ret[0] !== 0) {
            v4 = getStringFromWasm0(ret[0], ret[1]);
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v4;
    }
    /**
     * Serialize user overrides for persistence (e.g. localStorage).
     * @returns {string}
     */
    saveOverrides() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmkeybindings_saveOverrides(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Rebind a command. Pass a JSON-encoded chord to set, or `None` to
     * clear (disabling the binding).
     * @param {string} id
     * @param {string | null} [chord_json]
     */
    setBinding(id, chord_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(chord_json) ? 0 : passStringToWasm0(chord_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.wasmkeybindings_setBinding(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
}
if (Symbol.dispose) WasmKeybindings.prototype[Symbol.dispose] = WasmKeybindings.prototype.free;

/**
 * A sketch editing session bound to JavaScript. See module docs.
 */
export class WasmSketchSession {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmSketchSessionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmsketchsession_free(ptr, 0);
    }
    /**
     * Add a full circle.
     * @param {number} cx
     * @param {number} cy
     * @param {number} radius
     */
    addCircle(cx, cy, radius) {
        wasm.wasmsketchsession_addCircle(this.__wbg_ptr, cx, cy, radius);
    }
    /**
     * Add a constraint from a JSON object matching the TypeScript
     * `SketchConstraint` shape.
     * @param {string} json
     */
    addConstraint(json) {
        const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmsketchsession_addConstraint(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Add a line directly (for scripted / MCP use).
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     */
    addLine(x1, y1, x2, y2) {
        wasm.wasmsketchsession_addLine(this.__wbg_ptr, x1, y1, x2, y2);
    }
    /**
     * Add an axis-aligned rectangle between two corners.
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     */
    addRectangle(x1, y1, x2, y2) {
        wasm.wasmsketchsession_addRectangle(this.__wbg_ptr, x1, y1, x2, y2);
    }
    /**
     * Clear pending input.
     */
    cancelPending() {
        wasm.wasmsketchsession_cancelPending(this.__wbg_ptr);
    }
    /**
     * Clear the selection.
     */
    clearSelection() {
        wasm.wasmsketchsession_clearSelection(this.__wbg_ptr);
    }
    /**
     * Clear every entity and constraint.
     */
    clear() {
        wasm.wasmsketchsession_clear(this.__wbg_ptr);
    }
    /**
     * Construct a new session on the given plane.
     *
     * `plane_json` is either a JSON string (`"XY"` / `"XZ"` / `"YZ"`) or a
     * JSON object `{ origin, xDir, yDir }` for a custom plane.
     * @param {string} plane_json
     */
    constructor(plane_json) {
        const ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmsketchsession_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        WasmSketchSessionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Handle a primary-button click at the current cursor position. Returns
     * a short outcome string: `"no-cursor"`, `"selection"`, `"pending"`, or
     * `"committed"`.
     * @returns {string}
     */
    onClick() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.wasmsketchsession_onClick(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Clear the cursor.
     */
    onCursorLeave() {
        wasm.wasmsketchsession_onCursorLeave(this.__wbg_ptr);
    }
    /**
     * Update the cursor from a world-space ray (e.g. camera pick ray).
     * @param {number} ox
     * @param {number} oy
     * @param {number} oz
     * @param {number} dx
     * @param {number} dy
     * @param {number} dz
     */
    onCursorRay(ox, oy, oz, dx, dy, dz) {
        wasm.wasmsketchsession_onCursorRay(this.__wbg_ptr, ox, oy, oz, dx, dy, dz);
    }
    /**
     * Update the cursor directly from 2D sketch coordinates.
     * @param {number} x
     * @param {number} y
     */
    onCursorSketch(x, y) {
        wasm.wasmsketchsession_onCursorSketch(this.__wbg_ptr, x, y);
    }
    /**
     * Handle a double-click (closes a polyline for the line tool).
     */
    onDoubleClick() {
        wasm.wasmsketchsession_onDoubleClick(this.__wbg_ptr);
    }
    /**
     * Redo the last undone mutation. Returns `true` if anything was redone.
     * @returns {boolean}
     */
    redo() {
        const ret = wasm.wasmsketchsession_redo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Remove the constraint at `index`.
     * @param {number} index
     */
    removeConstraint(index) {
        wasm.wasmsketchsession_removeConstraint(this.__wbg_ptr, index);
    }
    /**
     * Configure snapping behavior.
     * @param {boolean} grid_enabled
     * @param {number} grid_size
     * @param {boolean} point_enabled
     * @param {number} point_tolerance
     */
    setSnap(grid_enabled, grid_size, point_enabled, point_tolerance) {
        wasm.wasmsketchsession_setSnap(this.__wbg_ptr, grid_enabled, grid_size, point_enabled, point_tolerance);
    }
    /**
     * Change the active drawing tool. Unknown names are ignored.
     * @param {string} tool
     */
    setTool(tool) {
        const ptr0 = passStringToWasm0(tool, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.wasmsketchsession_setTool(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Return a JSON snapshot of the full session state. React can mirror
     * this into its own store on every mutation.
     * @returns {string}
     */
    snapshot() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.wasmsketchsession_snapshot(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Run the constraint solver. Returns `true` if it converged.
     * @returns {boolean}
     */
    solve() {
        const ret = wasm.wasmsketchsession_solve(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Test-select or deselect a segment.
     * @param {number} segment_index
     */
    toggleSelection(segment_index) {
        wasm.wasmsketchsession_toggleSelection(this.__wbg_ptr, segment_index);
    }
    /**
     * Undo the last mutation. Returns `true` if anything was undone.
     * @returns {boolean}
     */
    undo() {
        const ret = wasm.wasmsketchsession_undo(this.__wbg_ptr);
        return ret !== 0;
    }
}
if (Symbol.dispose) WasmSketchSession.prototype[Symbol.dispose] = WasmSketchSession.prototype.free;

/**
 * Analyze a solid for 3D printing characteristics.
 *
 * Returns JSON with wall thicknesses, overhang angles, hole sizes, etc.
 * Only works on solids with BRep data (primitives, not boolean results).
 * @param {Solid} solid
 * @returns {any}
 */
export function analyzeForPrinting(solid) {
    _assertClass(solid, Solid);
    const ret = wasm.analyzeForPrinting(solid.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Static structural analysis of a box solid.
 *
 * `spec_json` is a serialized `vcad_kernel_topopt::AnalysisSpec` (loads,
 * supports, resolution, youngs_modulus_mpa, poisson).
 * @param {string} spec_json
 * @param {number} min_x
 * @param {number} min_y
 * @param {number} min_z
 * @param {number} max_x
 * @param {number} max_y
 * @param {number} max_z
 * @returns {any}
 */
export function analyzeStaticsBox(spec_json, min_x, min_y, min_z, max_x, max_y, max_z) {
    const val2 = +min_x;
    const val3 = +min_y;
    const val4 = +min_z;
    const val5 = +max_x;
    const val6 = +max_y;
    const val7 = +max_z;
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.analyzeStaticsBox(ptr0, len0, val2, val3, val4, val5, val6, val7);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Static structural analysis of an existing (closed) evaluated mesh: the
 * mesh interior is voxelized and solved under the given loads/supports.
 * @param {string} spec_json
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {any}
 */
export function analyzeStaticsMesh(spec_json, positions, indices) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.analyzeStaticsMesh(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Thin-wire MoM antenna analysis: sweep Z_in and S11 over a band, find
 * the in-band resonance, scan the far-field pattern for peak gain, and
 * return the `vcad.antenna-claims/1` set + unified-receipt claims.
 *
 * `spec_json` is a `vcad_kernel_antenna::spec::AntennaSpec` (named
 * parameters allowed), `params_json` a `{name: value}` map binding them,
 * `options_json` an `AntennaOptions` (the frequency `band` is
 * required).
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function antennaAnalyze(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.antennaAnalyze(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Build a reproducibility receipt JSON for a completed run.
 * @param {string} molecule_json
 * @param {string} force_field
 * @param {string} run
 * @param {string} params_json
 * @param {string} outputs_json
 * @returns {string}
 */
export function atoms_build_receipt(molecule_json, force_field, run, params_json, outputs_json) {
    let deferred7_0;
    let deferred7_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(force_field, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(run, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
            ptr4 = passStringToWasm0(outputs_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_free(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.atoms_build_receipt(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        var ptr6 = ret[0];
        var len6 = ret[1];
        if (ret[3]) {
            ptr6 = 0; len6 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred7_0 = ptr6;
        deferred7_1 = len6;
        return getStringFromWasm0(ptr6, len6);
    } finally {
        wasm.__wbindgen_free(deferred7_0, deferred7_1, 1);
    }
}

/**
 * Homogenize a periodic structure into bulk material properties — density,
 * cubic elastic constants, and VRH isotropic moduli — as a `MaterialCard`
 * JSON. The atoms → continuum bridge: the returned density (kg/m³) and
 * moduli (GPa) are what a millimetre-scale part consumes.
 * @param {string} molecule_json
 * @param {string} config_json
 * @returns {string}
 */
export function atoms_homogenize(molecule_json, config_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.atoms_homogenize(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Compute a structural report (formula, Rg, bbox, …) as JSON.
 * @param {string} molecule_json
 * @returns {string}
 */
export function atoms_inspect(molecule_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.atoms_inspect(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Minimize a structure and return `{ result, molecule }` JSON, where `molecule`
 * is the relaxed structure.
 * @param {string} molecule_json
 * @param {string} config_json
 * @param {number} max_iters
 * @param {number} force_tol
 * @returns {string}
 */
export function atoms_minimize(molecule_json, config_json, max_iters, force_tol) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val3 = +max_iters;
        const val4 = +force_tol;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.atoms_minimize(ptr0, len0, ptr1, len1, val3, val4);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Parse XYZ / extended-XYZ text into a `MoleculeSystem` JSON string.
 * @param {string} text
 * @returns {string}
 */
export function atoms_parse_xyz(text) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.atoms_parse_xyz(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Serialize a `MoleculeSystem` JSON string to XYZ text.
 * @param {string} molecule_json
 * @returns {string}
 */
export function atoms_write_xyz(molecule_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(molecule_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.atoms_write_xyz(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Join a `PrintPrediction` (JSON) with measurements (JSON array of
 * `[id, value]` pairs) into a `CalibrationReport` (JSON). `options_json` is
 * the TS options object; the wrapper stamps `recorded_at` (this crate has
 * no clock).
 * @param {string} prediction_json
 * @param {string} measurements_json
 * @param {string} options_json
 * @returns {string}
 */
export function buildCalibrationReportJson(prediction_json, measurements_json, options_json) {
    let deferred5_0;
    let deferred5_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(prediction_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(measurements_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.buildCalibrationReportJson(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Build binary GLB bytes from a JSON `GlbSpec` plus shared flat data
 * buffers. Geometry (positions/normals/animation keyframes) lives in
 * `f32_data`, indices in `u32_data`; the spec references `[offset, len]`
 * spans into them. Single source of truth for GLB serialization — the
 * `@vcad/mcp` and `@vcad/core` exporters are thin wrappers over this.
 * @param {string} spec_json
 * @param {Float32Array | number[]} f32_data
 * @param {Uint32Array | number[]} u32_data
 * @returns {Uint8Array}
 */
export function buildGlbBytes(spec_json, f32_data, u32_data) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(f32_data, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(u32_data, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.buildGlbBytes(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v4;
}

/**
 * Build a built-in part's sub-document given its path and params JSON.
 *
 * `path` is either a bare id (`"fastener.bolt.socket-head"`) or prefixed
 * with `std:`. `params_json` is a JSON object whose keys are parameter
 * names. Returns a JSON-serialized [`vcad_ir::Document`] that the engine
 * can splice into the parent document.
 * @param {string} path
 * @param {string} params_json
 * @returns {string}
 */
export function buildPart(path, params_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.buildPart(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Build a sheet-metal IR document from a `sheet_metal_create` request
 * (base flange + ordered flanges/hems/jogs/bend relief) via
 * `vcad_eval::sheet_build`. Returns the document JSON.
 * @param {string} args_json
 * @returns {string}
 */
export function buildSheetMetalDocument(args_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.buildSheetMetalDocument(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Build binary STL bytes from a JSON `StlSpec` plus shared flat data
 * buffers (see [`build_glb_bytes`] for the buffer convention).
 * @param {string} spec_json
 * @param {Float32Array | number[]} f32_data
 * @param {Uint32Array | number[]} u32_data
 * @returns {Uint8Array}
 */
export function buildStlBytes(spec_json, f32_data, u32_data) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(f32_data, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(u32_data, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.buildStlBytes(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v4;
}

/**
 * Build the system prompt sent with every `/api/chat` request.
 *
 * `parts_json` must deserialize into `Vec<vcad_chat::PartInfo>` (the TS
 * web caller already walks its own document store to build this shape,
 * so we accept it pre-built rather than reserializing the full Document
 * through the wasm boundary on every request). `selection_json` must
 * deserialize into `Vec<vcad_chat::SelectionInfo>`. Either defaults to
 * an empty array on parse failure.
 *
 * Returns the rendered prompt string — byte-identical to what the TUI
 * produces via `vcad_chat::build_system_prompt` for the same inputs.
 * @param {string} parts_json
 * @param {string} selection_json
 * @returns {string}
 */
export function build_chat_system_prompt(parts_json, selection_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(parts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.build_chat_system_prompt(ptr0, len0, ptr1, len1);
        deferred3_0 = ret[0];
        deferred3_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Default ± tolerance for a measurable kind ("dimension" | "diameter" |
 * "mass") that doesn't declare one.
 * @param {string} kind
 * @param {number} predicted
 * @returns {number}
 */
export function calibrationDefaultTolerance(kind, predicted) {
    const val2 = +predicted;
    const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.calibrationDefaultTolerance(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Content fingerprint (fnv1a-128 over the canonicalized JSON) of a document
 * IR or any JSON value, passed as a JSON string.
 * @param {string} doc_json
 * @returns {string}
 */
export function calibrationFingerprintDocument(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.calibrationFingerprintDocument(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Generate a height field from mesh using drop-cutter algorithm.
 *
 * # Arguments
 * * `vertices_json` - Vertex array as JSON `[[x,y,z], ...]`
 * * `indices_json` - Triangle indices as JSON [i0, i1, i2, ...]
 * * `tool_json` - Tool definition as JSON
 * * `bounds_json` - Bounds [min_x, min_y, max_x, max_y] as JSON
 * * `resolution` - Sample spacing in mm
 *
 * # Returns
 * Height field as JSON with { nx, ny, bounds, heights }
 * @param {string} vertices_json
 * @param {string} indices_json
 * @param {string} tool_json
 * @param {string} bounds_json
 * @param {number} resolution
 * @returns {string}
 */
export function camDropCutter(vertices_json, indices_json, tool_json, bounds_json, resolution) {
    let deferred7_0;
    let deferred7_1;
    try {
        const val5 = +resolution;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
        try {
            ptr0 = passStringToWasm0(vertices_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(indices_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passStringToWasm0(bounds_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.camDropCutter(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, val5);
        var ptr6 = ret[0];
        var len6 = ret[1];
        if (ret[3]) {
            ptr6 = 0; len6 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred7_0 = ptr6;
        deferred7_1 = len6;
        return getStringFromWasm0(ptr6, len6);
    } finally {
        wasm.__wbindgen_free(deferred7_0, deferred7_1, 1);
    }
}

/**
 * Export toolpath to GRBL G-code.
 *
 * # Arguments
 * * `toolpath_json` - Toolpath as JSON string
 * * `job_name` - Name for the G-code file header
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 *
 * # Returns
 * G-code as string.
 * @param {string} toolpath_json
 * @param {string} job_name
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @returns {string}
 */
export function camExportGcode(toolpath_json, job_name, tool_json, settings) {
    let deferred5_0;
    let deferred5_1;
    try {
        _assertClass(settings, WasmCamSettings);
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(toolpath_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(job_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.camExportGcode(ptr0, len0, ptr1, len1, ptr2, len2, settings.__wbg_ptr);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Export toolpath to LinuxCNC G-code.
 *
 * # Arguments
 * * `toolpath_json` - Toolpath as JSON string
 * * `job_name` - Name for the G-code file header
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 * * `program_number` - O-word program number
 *
 * # Returns
 * G-code as string.
 * @param {string} toolpath_json
 * @param {string} job_name
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @param {number} program_number
 * @returns {string}
 */
export function camExportLinuxCnc(toolpath_json, job_name, tool_json, settings, program_number) {
    let deferred6_0;
    let deferred6_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val4 = +program_number;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(toolpath_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(job_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.camExportLinuxCnc(ptr0, len0, ptr1, len1, ptr2, len2, settings.__wbg_ptr, val4);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Generate a circular pocket toolpath.
 *
 * # Arguments
 * * `cx`, `cy` - Center point
 * * `radius` - Pocket radius
 * * `depth` - Cut depth
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 *
 * # Returns
 * Toolpath as JSON string.
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} depth
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @returns {string}
 */
export function camGenerateCircularPocket(cx, cy, radius, depth, tool_json, settings) {
    let deferred7_0;
    let deferred7_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val2 = +cx;
        const val3 = +cy;
        const val4 = +radius;
        const val5 = +depth;
        const ptr0 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.camGenerateCircularPocket(val2, val3, val4, val5, ptr0, len0, settings.__wbg_ptr);
        var ptr6 = ret[0];
        var len6 = ret[1];
        if (ret[3]) {
            ptr6 = 0; len6 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred7_0 = ptr6;
        deferred7_1 = len6;
        return getStringFromWasm0(ptr6, len6);
    } finally {
        wasm.__wbindgen_free(deferred7_0, deferred7_1, 1);
    }
}

/**
 * Generate a rectangular contour toolpath.
 *
 * # Arguments
 * * `x`, `y` - Top-left corner
 * * `width`, `height` - Rectangle dimensions
 * * `depth` - Cut depth
 * * `offset` - Offset from contour (positive = outside)
 * * `tab_count` - Number of tabs (0 for none)
 * * `tab_width` - Tab width in mm
 * * `tab_height` - Tab height in mm
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 *
 * # Returns
 * Toolpath as JSON string.
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @param {number} offset
 * @param {number} tab_count
 * @param {number} tab_width
 * @param {number} tab_height
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @returns {string}
 */
export function camGenerateContour(x, y, width, height, depth, offset, tab_count, tab_width, tab_height, tool_json, settings) {
    let deferred12_0;
    let deferred12_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val2 = +x;
        const val3 = +y;
        const val4 = +width;
        const val5 = +height;
        const val6 = +depth;
        const val7 = +offset;
        const val8 = +tab_count;
        const val9 = +tab_width;
        const val10 = +tab_height;
        const ptr0 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.camGenerateContour(val2, val3, val4, val5, val6, val7, val8, val9, val10, ptr0, len0, settings.__wbg_ptr);
        var ptr11 = ret[0];
        var len11 = ret[1];
        if (ret[3]) {
            ptr11 = 0; len11 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred12_0 = ptr11;
        deferred12_1 = len11;
        return getStringFromWasm0(ptr11, len11);
    } finally {
        wasm.__wbindgen_free(deferred12_0, deferred12_1, 1);
    }
}

/**
 * Generate a face toolpath.
 *
 * # Arguments
 * * `min_x`, `min_y`, `max_x`, `max_y` - Bounds of the area to face
 * * `depth` - Cut depth (positive value)
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 *
 * # Returns
 * Toolpath as JSON string.
 * @param {number} min_x
 * @param {number} min_y
 * @param {number} max_x
 * @param {number} max_y
 * @param {number} depth
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @returns {string}
 */
export function camGenerateFace(min_x, min_y, max_x, max_y, depth, tool_json, settings) {
    let deferred8_0;
    let deferred8_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val2 = +min_x;
        const val3 = +min_y;
        const val4 = +max_x;
        const val5 = +max_y;
        const val6 = +depth;
        const ptr0 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.camGenerateFace(val2, val3, val4, val5, val6, ptr0, len0, settings.__wbg_ptr);
        var ptr7 = ret[0];
        var len7 = ret[1];
        if (ret[3]) {
            ptr7 = 0; len7 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred8_0 = ptr7;
        deferred8_1 = len7;
        return getStringFromWasm0(ptr7, len7);
    } finally {
        wasm.__wbindgen_free(deferred8_0, deferred8_1, 1);
    }
}

/**
 * Generate a rectangular pocket toolpath.
 *
 * # Arguments
 * * `x`, `y` - Top-left corner
 * * `width`, `height` - Pocket dimensions
 * * `depth` - Cut depth
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 *
 * # Returns
 * Toolpath as JSON string.
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @returns {string}
 */
export function camGeneratePocket(x, y, width, height, depth, tool_json, settings) {
    let deferred8_0;
    let deferred8_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val2 = +x;
        const val3 = +y;
        const val4 = +width;
        const val5 = +height;
        const val6 = +depth;
        const ptr0 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.camGeneratePocket(val2, val3, val4, val5, val6, ptr0, len0, settings.__wbg_ptr);
        var ptr7 = ret[0];
        var len7 = ret[1];
        if (ret[3]) {
            ptr7 = 0; len7 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred8_0 = ptr7;
        deferred8_1 = len7;
        return getStringFromWasm0(ptr7, len7);
    } finally {
        wasm.__wbindgen_free(deferred8_0, deferred8_1, 1);
    }
}

/**
 * Generate 3D roughing toolpath from a height field.
 *
 * # Arguments
 * * `height_field_json` - Height field from cam_drop_cutter
 * * `tool_json` - Tool definition as JSON
 * * `settings` - CAM settings
 * * `target_z` - Target bottom Z depth
 * * `top_z` - Top Z (stock surface)
 * * `stock_margin` - Extra material to leave (mm)
 * * `direction` - Raster direction in degrees (0=X, 90=Y)
 *
 * # Returns
 * Toolpath as JSON string.
 * @param {string} height_field_json
 * @param {string} tool_json
 * @param {WasmCamSettings} settings
 * @param {number} target_z
 * @param {number} top_z
 * @param {number} stock_margin
 * @param {number} direction
 * @returns {string}
 */
export function camGenerateRoughing3d(height_field_json, tool_json, settings, target_z, top_z, stock_margin, direction) {
    let deferred8_0;
    let deferred8_1;
    try {
        _assertClass(settings, WasmCamSettings);
        const val3 = +target_z;
        const val4 = +top_z;
        const val5 = +stock_margin;
        const val6 = +direction;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(height_field_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(tool_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.camGenerateRoughing3d(ptr0, len0, ptr1, len1, settings.__wbg_ptr, val3, val4, val5, val6);
        var ptr7 = ret[0];
        var len7 = ret[1];
        if (ret[3]) {
            ptr7 = 0; len7 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred8_0 = ptr7;
        deferred8_1 = len7;
        return getStringFromWasm0(ptr7, len7);
    } finally {
        wasm.__wbindgen_free(deferred8_0, deferred8_1, 1);
    }
}

/**
 * Get default tool library.
 *
 * # Returns
 * Tool library as JSON array.
 * @returns {string}
 */
export function camGetDefaultTools() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.camGetDefaultTools();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Get toolpath statistics.
 *
 * # Arguments
 * * `toolpath_json` - Toolpath as JSON string
 *
 * # Returns
 * JSON object with statistics: { cutting_length, estimated_time, bounding_box }
 * @param {string} toolpath_json
 * @returns {any}
 */
export function camToolpathStats(toolpath_json) {
    const ptr0 = passStringToWasm0(toolpath_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.camToolpathStats(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Validate and measure the document's constraints without mutating
 * anything. Returns the solve report JSON (dimensional constraints all
 * measured into `drivenValues`).
 * @param {string} doc_json
 * @returns {string}
 */
export function checkDesignConstraints(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.checkDesignConstraints(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Check a solid for DFM (Design for Manufacturing) printability issues.
 *
 * Returns warnings with face indices for viewport highlighting.
 * @param {Solid} solid
 * @param {string} printer_profile
 * @returns {any}
 */
export function checkPrintability(solid, printer_profile) {
    _assertClass(solid, Solid);
    const ptr0 = passStringToWasm0(printer_profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.checkPrintability(solid.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Manufacturability check against a shop profile.
 * @param {string} chain_json
 * @param {string} shop_json
 * @returns {string}
 */
export function checkSheetMetal(chain_json, shop_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(chain_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(shop_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.checkSheetMetal(ptr0, len0, ptr1, len1);
        deferred3_0 = ret[0];
        deferred3_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Small-signal AC response driven by device `source_id` (a V or I source)
 * with unit amplitude, solved at each angular frequency in `omegas` (rad/s).
 * Returns per-omega complex node voltages as re/im arrays.
 * @param {string} spec_json
 * @param {number} source_id
 * @param {Float64Array | number[]} omegas
 * @returns {any}
 */
export function circuitAcResponse(spec_json, source_id, omegas) {
    const val3 = +source_id;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF64ToWasm0(omegas, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.circuitAcResponse(ptr0, len0, val3, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * DC operating point of a `{ devices: [...] }` circuit spec: node voltages,
 * device currents, the Tellegen power-balance residual, and predicted
 * `vcad.spice-claims/1` claims (Provisional rollup, never Pass).
 * @param {string} spec_json
 * @returns {any}
 */
export function circuitDcOperatingPoint(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.circuitDcOperatingPoint(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Map a schematic sheet to a simulatable circuit spec via the fail-closed
 * netlist seam (`vcad-ecad-sim::circuit::netlist`).
 *
 * * `sch_json` — JSON-serialized `SchematicSheet` (same shape as
 *   `ecadGenerateNetlist` takes).
 * * `options_json` — JSON `MapOptions` (`{}` for defaults).
 *
 * Returns `{ok: true, devices, nodeOfNet, deviceOfRef, ...}` on success, or
 * `{ok: false, blockers: [{reference, message}]}` when any component can't
 * be mapped — nothing is silently skipped.
 * @param {string} sch_json
 * @param {string} options_json
 * @returns {any}
 */
export function circuitFromSchematic(sch_json, options_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(sch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.circuitFromSchematic(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Adjoint sensitivities of the voltage at `out_node` to every device primary
 * — one extra transposed solve for the whole gradient. `analysis_json`
 * selects `{"dc": true}` or `{"ac": {"sourceId", "omega"}}`.
 * @param {string} spec_json
 * @param {number} out_node
 * @param {string} analysis_json
 * @returns {any}
 */
export function circuitSensitivities(spec_json, out_node, analysis_json) {
    const val3 = +out_node;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(analysis_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.circuitSensitivities(ptr0, len0, val3, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Batched transient run (trapezoidal integrator): step `steps` times from
 * the power-on state, sampling every `sample_every` steps. Sample count is
 * capped at 5000 — raise `sample_every` for long runs.
 * @param {string} spec_json
 * @param {number} steps
 * @param {number} sample_every
 * @returns {any}
 */
export function circuitTransient(spec_json, steps, sample_every) {
    const val2 = +steps;
    const val3 = +sample_every;
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.circuitTransient(ptr0, len0, val2, val3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Tune the free devices toward the target by adjoint gradient descent.
 * Fails closed if any free device's sensitivity slot is deferred
 * (a placeholder, not a computed gradient — at M0, diodes at AC).
 * @param {string} spec_json
 * @param {string} tune_json
 * @returns {any}
 */
export function circuitTune(spec_json, tune_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(tune_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.circuitTune(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Compute creased normals using GPU acceleration.
 *
 * # Arguments
 * * `positions` - Flat array of vertex positions (x, y, z, ...)
 * * `indices` - Triangle indices
 * * `crease_angle` - Angle in radians; faces meeting at sharper angles get hard edges
 *
 * # Returns
 * Flat array of normals (nx, ny, nz, ...), same length as positions.
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @param {number} crease_angle
 * @returns {Promise<Float32Array>}
 */
export function computeCreasedNormalsGpu(positions, indices, crease_angle) {
    const val3 = +crease_angle;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.computeCreasedNormalsGpu(ptr0, len0, ptr1, len1, val3);
    return ret;
}

/**
 * Compute aggregate mass properties of a triangle mesh: divergence-theorem
 * volume, surface area, axis-aligned bounding box, volume-weighted center
 * of mass (with an area-weighted surface-centroid fallback for open or
 * inconsistently wound meshes), and triangle count.
 *
 * Positions are `[x, y, z, ...]` (flat f32), indices are `[i0, i1, i2, ...]`.
 * Returns `{ volume, signedVolume, insideOut, area, bbox: { min: {x,y,z},
 * max: {x,y,z} }, centerOfMass: {x,y,z}, triangles }` in the same units as
 * positions (mm). `volume` is the magnitude; `signedVolume` is negative (and
 * `insideOut` true) for a mesh wound inside out.
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {any}
 */
export function computeMeshProperties(positions, indices) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.computeMeshProperties(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Compute volume of a closed triangle mesh using the divergence theorem.
 *
 * Positions are `[x, y, z, ...]` (flat f32), indices are `[i0, i1, i2, ...]`.
 * Returns volume in mm³ (same units as positions).
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {number}
 */
export function computeMeshVolume(positions, indices) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.computeMeshVolume(ptr0, len0, ptr1, len1);
    return ret;
}

/**
 * Cost estimate for a chain.
 * @param {string} chain_json
 * @param {string} rates_json
 * @param {number} quantity
 * @returns {string}
 */
export function costSheetMetal(chain_json, rates_json, quantity) {
    let deferred4_0;
    let deferred4_1;
    try {
        const val3 = +quantity;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(chain_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(rates_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.costSheetMetal(ptr0, len0, ptr1, len1, val3);
        deferred4_0 = ret[0];
        deferred4_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Create a detail view from a projected view.
 *
 * A detail view is a magnified region of a parent view, useful for showing
 * fine features that would be too small in the main view.
 *
 * # Arguments
 * * `parent_json` - JSON string of the parent ProjectedView
 * * `center_x` - X coordinate of the region center
 * * `center_y` - Y coordinate of the region center
 * * `scale` - Magnification factor (e.g., 2.0 = 2x)
 * * `width` - Width of the region to capture
 * * `height` - Height of the region to capture
 * * `label` - Label for the detail view (e.g., "A")
 *
 * # Returns
 * A JS object containing the detail view with edges and bounds.
 * @param {string} parent_json
 * @param {number} center_x
 * @param {number} center_y
 * @param {number} scale
 * @param {number} width
 * @param {number} height
 * @param {string} label
 * @returns {any}
 */
export function createDetailView(parent_json, center_x, center_y, scale, width, height, label) {
    const val3 = +center_x;
    const val4 = +center_y;
    const val5 = +scale;
    const val6 = +width;
    const val7 = +height;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(parent_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.createDetailView(ptr0, len0, val3, val4, val5, val6, val7, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Decimate a mesh to reduce triangle count.
 *
 * # Arguments
 * * `positions` - Flat array of vertex positions
 * * `indices` - Triangle indices
 * * `target_ratio` - Target ratio of triangles to keep (0.5 = 50%)
 *
 * # Returns
 * A JS object with decimated positions, indices, and normals.
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @param {number} target_ratio
 * @returns {Promise<any>}
 */
export function decimateMeshGpu(positions, indices, target_ratio) {
    const val3 = +target_ratio;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.decimateMeshGpu(ptr0, len0, ptr1, len1, val3);
    return ret;
}

/**
 * Derive parts from a Document (as JSON).
 *
 * Returns a JSON-serialized `Vec<PartInfo>`.
 * @param {string} doc_json
 * @returns {any}
 */
export function deriveParts(doc_json) {
    const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.deriveParts(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Digitize sketch segments into embroidery stitches.
 *
 * Takes a JSON array of `SketchSegment2D` (from a Sketch2D node) plus
 * stitch options, and returns an `EmbPattern` JSON string.
 * @param {string} segments_json
 * @param {string} options_json
 * @returns {string}
 */
export function digitizeSketch(segments_json, options_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(segments_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.digitizeSketch(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Digitize text into embroidery stitches.
 *
 * Converts a text string into glyph outlines, then applies the specified
 * stitch algorithm (running, satin, or fill) to produce an `EmbPattern`.
 * Returns the same JSON shape as `readEmbroideryPes`.
 * @param {string} text
 * @param {number} height
 * @param {string} options_json
 * @returns {string}
 */
export function digitizeText(text, height, options_json) {
    let deferred5_0;
    let deferred5_1;
    try {
        const val3 = +height;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.digitizeText(ptr0, len0, val3, ptr1, len1);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Semantic (entity-level) diff of two `.vcad` documents.
 *
 * Returns a `DocumentDiff` JSON value: `{ changes: [{ kind, id, name?,
 * type: "added"|"removed"|"modified", value?|fields? }] }`. Entities are
 * matched by stable id, so reordering alone yields an empty diff.
 * @param {string} old_json
 * @param {string} new_json
 * @returns {any}
 */
export function documentDiff(old_json, new_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(old_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(new_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.documentDiff(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Apply a `DocumentDiff` (as produced by [`document_diff`]) to a document,
 * returning the patched document JSON.
 * @param {string} old_json
 * @param {string} diff_json
 * @returns {any}
 */
export function documentDiffApply(old_json, diff_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(old_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(diff_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.documentDiffApply(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Human-readable one-line-per-change rendering of a `DocumentDiff`.
 * @param {string} diff_json
 * @returns {string}
 */
export function documentDiffHuman(diff_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(diff_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.documentDiffHuman(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Fail-closed three-way merge of two documents against a common ancestor.
 *
 * `resolutions_json` is an optional JSON array of user decisions
 * (`[{ kind, id, path?, side: "ours"|"theirs" }]`) settling previously
 * reported conflicts; pass `null`/empty for a plain merge. Returns
 * `{ merged }` on success or `{ conflicts }` when unresolved conflicts
 * remain — never both.
 * @param {string} base_json
 * @param {string} ours_json
 * @param {string} theirs_json
 * @param {string | null} [resolutions_json]
 * @returns {any}
 */
export function documentMerge(base_json, ours_json, theirs_json, resolutions_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passStringToWasm0(base_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(ours_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(theirs_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = isLikeNone(resolutions_json) ? 0 : passStringToWasm0(resolutions_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.documentMerge(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Differentiate a document's mass-property + bounding-box QoIs with respect
 * to a single named parameter (`d QoI / dθ`) via the differentiable seam.
 *
 * # Arguments
 *
 * * `doc_json` — a JSON string of a vcad Document that declares `parameter`
 *   in its `parameters` map (with a binding onto some geometry field).
 * * `parameter` — the named parameter to differentiate.
 * * `density` — density fed to the mass integrals (mass = density · volume).
 * * `probe_step` — finite step used by seeding synthesis to match surfaces
 *   between θ ± step (the returned volume/mass/centroid derivatives are
 *   analytic seam evaluations, not finite differences). Pass `0` to use the
 *   `1e-4` default.
 *
 * # Returns
 *
 * A JsValue array with one entry per solid part, each
 * `{ partIndex, volume, dVolume, mass, dMass, centroid, dCentroid,
 * bboxExtents, dBboxExtents }` (see [`vcad_eval::diff::PartQoiGradient`]).
 * @param {string} doc_json
 * @param {string} parameter
 * @param {number} density
 * @param {number} probe_step
 * @returns {any}
 */
export function documentParameterGradient(doc_json, parameter, density, probe_step) {
    const val3 = +density;
    const val4 = +probe_step;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(parameter, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.documentParameterGradient(ptr0, len0, ptr1, len1, val3, val4);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Differentiate a set of quantities with respect to a set of named document
 * parameters, returning a ranked, trust-bounded sensitivity table.
 *
 * The difference from [`document_parameter_gradient`] is not the arithmetic
 * but what comes back with it: each row carries its unit, the route that
 * produced it, whether that route is exact, and a **trust radius** — the
 * interval of the parameter over which the derivative describes the same
 * solid. The radius is *searched for*, by bisecting outward until the
 * document's topology signature changes, rather than assumed.
 *
 * # Arguments
 *
 * * `doc_json` — JSON string of a vcad Document.
 * * `request_json` — JSON string of a
 *   [`vcad_eval::sensitivity::SensitivityRequest`]: `{ parameters?,
 *   quantities?, part?, density?, probeStep?, findTrustRadius?,
 *   topologyReach? }`. Omitting `parameters` differentiates every named
 *   parameter; omitting `quantities` reports volume and mass.
 *
 * # Returns
 *
 * A [`vcad_eval::sensitivity::SensitivityReport`]: the table, a rendered
 * view, the per-objective ranking, any rows that may not steer an
 * optimizer, and one receipt claim per row.
 * @param {string} doc_json
 * @param {string} request_json
 * @returns {any}
 */
export function documentSensitivities(doc_json, request_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.documentSensitivities(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Convert a Document (as JSON) back to loon source code.
 * @param {string} doc_json
 * @returns {string}
 */
export function documentToLoon(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.documentToLoon(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Convert a Document (as JSON) to loon, also returning unsupported variant names.
 *
 * Returns a JS object `{ source: string, unsupported: string[] }`.
 * When `unsupported` is non-empty, the output contains comment placeholders for
 * those nodes and callers should warn the user that data will be lost.
 *
 * **Serializer note:** the result must go through
 * [`serde_wasm_bindgen::Serializer::json_compatible`], not the plain
 * `to_value`. `serde_json::json!` builds a `Value::Object`, which serde
 * emits through `serialize_map` — and the default serde-wasm-bindgen
 * serializer turns maps into a JS `Map`, whose `.source` and `.unsupported`
 * are both `undefined`. Derived structs go through `serialize_struct` and
 * become plain objects, which is why every other export in this file is
 * unaffected. Reading `.unsupported.length` off the `Map` crashed the whole
 * Source panel.
 * @param {string} doc_json
 * @returns {any}
 */
export function documentToLoonChecked(doc_json) {
    const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.documentToLoonChecked(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Export a document's scene roots to a STEP AP214 buffer, preserving BRep.
 *
 * Evaluates every visible root through the kernel (booleans, transforms,
 * fillets, sweeps all stay BRep) and serializes them as one STEP body per
 * root. Errors if any root evaluates to a mesh-only or empty solid, naming
 * the offending roots so the caller can fall back per part.
 *
 * # Arguments
 *
 * * `doc_json` - A JSON string representing a vcad Document
 *
 * # Returns
 *
 * The STEP file contents as bytes.
 * @param {string} doc_json
 * @returns {Uint8Array}
 */
export function documentToStepBuffer(doc_json) {
    const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.documentToStepBuffer(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Compose a drawing sheet from projected views, sections, annotations,
 * title block, and BOM table, and export it as a PDF.
 *
 * # Arguments
 * * `spec_json` - JSON `SheetSpec` (see the struct docs above).
 *
 * # Returns
 * PDF file bytes (deterministic PDF 1.4 from the kernel's drafting crate).
 * @param {string} spec_json
 * @returns {Uint8Array}
 */
export function drawingSheetToPdf(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.drawingSheetToPdf(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Compute air-gap flux density (tesla) from a JSON `AirGapSpec` via the
 * first-order magnetic-equivalent-circuit reluctance model — so B_gap is
 * computed from magnet + geometry, not assumed.
 * @param {string} spec_json
 * @returns {number}
 */
export function ecadAirgapFluxDensity(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadAirgapFluxDensity(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Solve the air-gap MEC network and return the full `AirGapSolution`:
 * gap/tooth/yoke flux densities, whether the iron was solved with its
 * saturating B–H law, and any past-the-knee warnings. Superset of
 * [`ecad_airgap_flux_density`], which returns only `bGapTesla`.
 * @param {string} spec_json
 * @returns {any}
 */
export function ecadAirgapSolve(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadAirgapSolve(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Build a re-runnable verification Receipt for the current board state.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadBuildReceipt(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadBuildReceipt(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Return all builtin symbol definitions.
 *
 * # Returns
 * Array of `SymbolDef` as JsValue.
 * @returns {any}
 */
export function ecadBuiltinSymbols() {
    const ret = wasm.ecadBuiltinSymbols();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run Design Rule Check on a PCB layout.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * Array of DRC violations as JsValue.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadCheckDrc(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadCheckDrc(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run DRC with the geometric checks scoped to an axis-aligned region
 * (mm) — the incremental verify-on-write entry point. Only elements
 * intersecting the region are subjects of the clearance/width/drill/edge
 * checks (each still judged against the whole board); connectivity
 * (shorts, islands, unrouted nets) always runs board-global.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 * * `min_x`, `min_y`, `max_x`, `max_y` - region corners (mm)
 *
 * # Returns
 * Array of DRC violations as JsValue.
 * @param {string} pcb_json
 * @param {number} min_x
 * @param {number} min_y
 * @param {number} max_x
 * @param {number} max_y
 * @returns {any}
 */
export function ecadCheckDrcInRegion(pcb_json, min_x, min_y, max_x, max_y) {
    const val2 = +min_x;
    const val3 = +min_y;
    const val4 = +max_x;
    const val5 = +max_y;
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadCheckDrcInRegion(ptr0, len0, val2, val3, val4, val5);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run Electrical Rule Check on a schematic sheet.
 *
 * # Arguments
 * * `sch_json` - JSON-serialized `SchematicSheet` struct
 *
 * # Returns
 * Array of ERC violations as JsValue.
 * @param {string} sch_json
 * @returns {any}
 */
export function ecadCheckErc(sch_json) {
    const ptr0 = passStringToWasm0(sch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadCheckErc(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Generate 3D component body meshes for all footprints on a PCB.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * Array of component meshes as JsValue.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadComponentMeshes(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadComponentMeshes(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Compute ratsnest lines for unrouted net connections.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 * * `netlist_json` - JSON-serialized netlist
 *
 * # Returns
 * Array of ratsnest lines as JsValue.
 * @param {string} pcb_json
 * @param {string} netlist_json
 * @returns {any}
 */
export function ecadComputeRatsnest(pcb_json, netlist_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(netlist_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadComputeRatsnest(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Audit one net's routing without mutating anything: length, via/layer
 * count, the closest approach to other-net copper (via the router oracle),
 * and any clearance/short/unconnected DRC issues it's involved in. The
 * read-only "inspect before you trust the route" verb.
 * @param {string} pcb_json
 * @param {string} net
 * @returns {any}
 */
export function ecadCritiqueRoute(pcb_json, net) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(net, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadCritiqueRoute(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run Design-for-Manufacturing checks on a PCB against a fab profile.
 *
 * Where DRC validates a board against its *own* declared design rules, DFM
 * validates it against a fab house's published process capability
 * (`jlcpcb`, `pcbway`, `generic_2layer`, `generic_4layer`). Returns a
 * per-rule pass/fail report naming the profile.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 * * `profile` - fab profile id (a `pcb_` prefix is tolerated)
 * * `rule_pack_toml` - optional TOML override of the bundled pack
 *   (empty string ⇒ use the bundled default)
 * @param {string} pcb_json
 * @param {string} profile
 * @param {string} rule_pack_toml
 * @returns {any}
 */
export function ecadDfmCheck(pcb_json, profile, rule_pack_toml) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(rule_pack_toml, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadDfmCheck(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Return the bundled default DFM rule-pack TOML for a fab profile, so a UI
 * can show and tweak it.
 * @param {string} profile
 * @returns {string}
 */
export function ecadDfmDefaultPack(profile) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.ecadDfmDefaultPack(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Evaluate first-order analytical motor performance from a JSON
 * `MotorSpec`: torque constant Kt, back-EMF constant Ke, no-load speed,
 * stall torque, and a speed–torque curve. Lets an agent ask "is this motor
 * any good?" instead of estimating by hand.
 * @param {string} spec_json
 * @returns {any}
 */
export function ecadEvaluateMotor(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadEvaluateMotor(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Generate all fabrication outputs for a PCB: Gerber RS-274X layer
 * files, an Excellon drill file (when the board has any holes), a
 * pick-and-place CSV, and a BOM CSV.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * Array of `{ name, content }` objects as JsValue.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadExportFab(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadExportFab(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run the whole fab-preparation pipeline on a board and return the fixed
 * board plus its DRC-delta receipt.
 *
 * Optionally calibrates the board's design rules from its own declared via
 * classes (logged, never silent), routes or certifies the connections it
 * arrived without, then loops — census the violations the *routing* is
 * answerable for, strip their nets, re-route through the session-probed
 * ladder — until that number is zero. Prunes dangling copper last.
 *
 * The receipt reports route-attributable violations against the same board
 * stripped of all routing, because on an imported fixture absolute zero is
 * not achievable and reporting one number would be reporting the wrong
 * thing. A run that does not converge comes back with `converged: false`
 * and the remaining offenders — it is the caller's job not to ship it.
 *
 * # Arguments
 * * `pcb_json` — JSON-serialized `Pcb`
 * * `options_json` — JSON-serialized `FabPrepOptions` (`null`/empty = defaults)
 *
 * # Returns
 * `{ report, pcb }` — the receipt, and the board to write back.
 * @param {string} pcb_json
 * @param {string | null} [options_json]
 * @returns {any}
 */
export function ecadFabPrep(pcb_json, options_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(options_json) ? 0 : passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadFabPrep(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Fill copper pour zones on the PCB.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * Array of filled zone polygons.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadFillZones(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadFillZones(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Propose spec-compatible alternatives for the part a query resolves to,
 * each classified by footprint compatibility. Returns `[]` if unresolvable.
 * @param {string} query
 * @returns {any}
 */
export function ecadFindAlternatives(query) {
    const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadFindAlternatives(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Resolve a KiCad-style footprint name to a parametric footprint
 * template (SOIC, DIP, QFP, SOT-23/223, pin headers, chip sizes).
 *
 * # Arguments
 * * `name` - Footprint name (e.g. "Package_SO:SOIC-8_3.9x4.9mm_P1.27mm")
 * * `pin_count` - Pin count used for fallback footprints
 *
 * # Returns
 * `FootprintTemplate` as JsValue, or null if unresolvable.
 * @param {string} name
 * @param {number} pin_count
 * @returns {any}
 */
export function ecadFootprintForName(name, pin_count) {
    const val2 = +pin_count;
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadFootprintForName(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Generate a netlist from a schematic sheet.
 *
 * # Arguments
 * * `sch_json` - JSON-serialized `SchematicSheet` struct
 *
 * # Returns
 * Netlist as JsValue.
 * @param {string} sch_json
 * @returns {any}
 */
export function ecadGenerateNetlist(sch_json) {
    const ptr0 = passStringToWasm0(sch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadGenerateNetlist(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Look up a single builtin symbol by ID.
 *
 * # Arguments
 * * `id` - Symbol identifier (e.g. "resistor", "capacitor", "npn")
 *
 * # Returns
 * `SymbolDef` as JsValue, or null if not found.
 * @param {string} id
 * @returns {any}
 */
export function ecadGetSymbol(id) {
    const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadGetSymbol(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * JSON manifest of the curated jellybean catalog: per part its name,
 * aliases, description, packages, and pin count.
 * @returns {string}
 */
export function ecadJellybeanManifest() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.ecadJellybeanManifest();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Compute Z offset for a PCB layer.
 *
 * # Arguments
 * * `layer` - Layer name (e.g. "FCu", "BCu")
 * * `thickness` - Board thickness in mm
 * * `explosion` - Explosion factor (0 = normal, >0 = exploded)
 * @param {string} layer
 * @param {number} thickness
 * @param {number} explosion
 * @returns {number}
 */
export function ecadLayerZ(layer, thickness, explosion) {
    const val2 = +thickness;
    const val3 = +explosion;
    const ptr0 = passStringToWasm0(layer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadLayerZ(ptr0, len0, val2, val3);
    return ret;
}

/**
 * Length-match a group of nets by meandering the shorter ones.
 *
 * `nets_json` is a JSON array of net names; `opts_json` is
 * `{ target_length?, tolerance?, max_amplitude?, spacing?, style?, check_only? }`
 * (style: "trombone" | "sawtooth"). Pure — returns per-net reports with
 * replacement traces AS DATA (`{ target_length, tolerance, all_matched,
 * nets: [{ net, length_before, length_after, matched, tuned, skip_reason?,
 * new_traces }] }`); the caller commits them. With `check_only:true` it
 * only measures and verdicts, generating no meanders.
 * @param {string} pcb_json
 * @param {string} nets_json
 * @param {string} opts_json
 * @returns {any}
 */
export function ecadLengthMatch(pcb_json, nets_json, opts_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(nets_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadLengthMatch(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Galvanic-continuity analysis for one net's *realized* copper: island
 * count, pad coverage, stitching vias, and the worst stranded island. The
 * realized-geometry check that gates power/PDN and impedance verdicts — a
 * closed-form PASS is only meaningful if the copper is a single continuous
 * conductor.
 * @param {string} pcb_json
 * @param {string} net
 * @returns {any}
 */
export function ecadNetContinuity(pcb_json, net) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(net, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadNetContinuity(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Get the net for a wire based on endpoint proximity to component pins.
 *
 * # Arguments
 * * `wire_json` - JSON-serialized `SchematicWire`
 * * `netlist_json` - JSON-serialized `Netlist`
 * * `components_json` - JSON-serialized `SchematicComponent[]`
 *
 * # Returns
 * Net name as string, or null.
 * @param {string} wire_json
 * @param {string} netlist_json
 * @param {string} components_json
 * @returns {any}
 */
export function ecadNetForWire(wire_json, netlist_json, components_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(wire_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(netlist_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(components_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadNetForWire(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * JSON manifest of all parametric part families.
 * @returns {string}
 */
export function ecadPartsManifest() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.ecadPartsManifest();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Generate layered, colored preview meshes for a PCB.
 *
 * Unlike the merged `PcbBoard` solid (one gray slab), this returns a small
 * set of separately-colored sub-meshes — green substrate, gold copper,
 * real 3D component bodies, white silkscreen — for the inline GLB viewer.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * Array of `PcbPreviewMesh` (`{ role, positions, indices, normals, color,
 * metalness, roughness }`) as JsValue.
 * @param {string} pcb_json
 * @returns {any}
 */
export function ecadPcbPreviewMeshes(pcb_json) {
    const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadPcbPreviewMeshes(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Resolve a footprint id to a land pattern *plus* resolution status.
 *
 * Like [`ecad_footprint_for_name`] but returns a `FootprintResolution`
 * (`{ template, matched, family, note }`) so callers can tell a real
 * package-family match from a generic placeholder and warn loudly instead
 * of silently placing wrong geometry.
 *
 * # Arguments
 * * `name` - Footprint id (e.g. "Package_DFN_QFN:QFN-40_5x5mm_P0.4mm")
 * * `pin_count` - Declared pin count, used when the id carries no count
 *   and as the basis for the generic fallback.
 *
 * # Returns
 * `FootprintResolution` as JsValue.
 * @param {string} name
 * @param {number} pin_count
 * @returns {any}
 */
export function ecadResolveFootprint(name, pin_count) {
    const val2 = +pin_count;
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadResolveFootprint(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Resolve a free-text query (e.g. `"10k 0603 1%"`) into one fully-specified
 * part: footprint + symbol + 3D body + MPN cross-references. Returns `null`
 * when the query carries no resolvable passive value. Fully offline.
 * @param {string} query
 * @returns {any}
 */
export function ecadResolvePart(query) {
    const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadResolvePart(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Resolve a named jellybean part (e.g. `"NE555"`) plus an optional
 * footprint into its pin definitions — number, name, electrical type, and
 * an auto-generated schematic-symbol position — along with the part's
 * aliases-resolved name, datasheet, and application notes. Returns `null`
 * when the name is not in the curated database. When `footprint` is
 * omitted the part's primary package is used. Fully offline.
 * @param {string} name
 * @param {string | null} [footprint]
 * @returns {any}
 */
export function ecadResolvePartDef(name, footprint) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(footprint) ? 0 : passStringToWasm0(footprint, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadResolvePartDef(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Auto-route the whole board over the incremental oracle.
 *
 * Computes the MST ratsnest and routes every unrouted net against a single
 * growing route session, with PathFinder-style negotiated congestion layered
 * over the bounded rip-up, retrying on the back layer with transition vias
 * that are probed on both layers before being committed. Returns
 * `{ traces, vias, zones, routed_nets, unrouted_nets, diagnostics,
 * routability }`; every returned trace and via is clearance-legal, or the
 * net is reported unrouted (with a diagnostic naming the blockers, the
 * congested region, and a suggested layer/via) — the router never emits
 * copper that shorts.
 *
 * `zones` are copper pours synthesized for high-current nets. **They must be
 * added to the board along with the traces and vias**: a poured net is
 * carried by its plane, so the router stitched its pads to the plane instead
 * of tracing them to each other.
 * @param {string} pcb_json
 * @param {number} width
 * @param {string} nets_filter_json
 * @param {number | null} [effort]
 * @returns {any}
 */
export function ecadRouteAll(pcb_json, width, nets_filter_json, effort) {
    const val3 = +width;
    const val4 = +(isLikeNone(effort) ? 0 : effort);
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(nets_filter_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadRouteAll(ptr0, len0, val3, ptr1, len1, !isLikeNone(effort), val4);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Route a declared differential pair (P/N) coupled and length-matched.
 *
 * Gap and leg width come from the pair's diff-pair net class. Returns
 * `{ success, p, n }` where `p`/`n` are the two routed legs (each
 * `{ net, segments, vias, success }`), or `success:false` when the pair
 * can't be resolved (each net needs exactly two pads).
 * @param {string} pcb_json
 * @param {string} net_p
 * @param {string} net_n
 * @returns {any}
 */
export function ecadRouteDiffPair(pcb_json, net_p, net_n) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(net_p, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(net_n, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadRouteDiffPair(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Route a net between two points on the PCB using the grid router.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 * * `net` - Net name to route
 * * `start_x`, `start_y` - Start coordinates (mm)
 * * `end_x`, `end_y` - End coordinates (mm)
 * * `width` - Trace width (mm)
 *
 * # Returns
 * Route result with segments and vias.
 * @param {string} pcb_json
 * @param {string} net
 * @param {number} start_x
 * @param {number} start_y
 * @param {number} end_x
 * @param {number} end_y
 * @param {number} width
 * @returns {any}
 */
export function ecadRouteNet(pcb_json, net, start_x, start_y, end_x, end_y, width) {
    const val3 = +start_x;
    const val4 = +start_y;
    const val5 = +end_x;
    const val6 = +end_y;
    const val7 = +width;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(net, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadRouteNet(ptr0, len0, ptr1, len1, val3, val4, val5, val6, val7);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Route a net with the avoiding A* maze router.
 *
 * Unlike `ecad_route_net_shove` (which detours around static
 * inflated bounding boxes of other-net *traces*), this searches a grid and
 * tests every step against the exact clearance oracle, so the route avoids
 * *all* copper on `layer` — traces, pads, and vias. Every returned segment
 * is clearance-legal by construction. Board-space mm in and out. Returns
 * `{ net, segments, vias, success }`.
 * @param {string} pcb_json
 * @param {string} layer
 * @param {string} net
 * @param {number} start_x
 * @param {number} start_y
 * @param {number} end_x
 * @param {number} end_y
 * @param {number} width
 * @returns {any}
 */
export function ecadRouteNetMaze(pcb_json, layer, net, start_x, start_y, end_x, end_y, width) {
    const val4 = +start_x;
    const val5 = +start_y;
    const val6 = +end_x;
    const val7 = +end_y;
    const val8 = +width;
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(layer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(net, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadRouteNetMaze(ptr0, len0, ptr1, len1, ptr2, len2, val4, val5, val6, val7, val8);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Route a net with the push-and-shove router.
 *
 * Unlike `ecad_route_net` (grid/wave BFS), this routes in
 * continuous coordinate space and detours around existing copper on other
 * nets, yielding cleaner diagonal paths. Coordinates are board-space mm in
 * and out — no grid origin offset. Returns `{ net, segments, vias, success }`.
 * @param {string} pcb_json
 * @param {string} net
 * @param {number} start_x
 * @param {number} start_y
 * @param {number} end_x
 * @param {number} end_y
 * @param {number} width
 * @returns {any}
 */
export function ecadRouteNetShove(pcb_json, net, start_x, start_y, end_x, end_y, width) {
    const val3 = +start_x;
    const val4 = +start_y;
    const val5 = +end_x;
    const val6 = +end_y;
    const val7 = +width;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(net, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadRouteNetShove(ptr0, len0, ptr1, len1, val3, val4, val5, val6, val7);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Search the catalog by spec, returning the best match plus its nearest
 * E-series neighbours (spec-distance ranked). Fully offline.
 * @param {string} query
 * @param {number} limit
 * @returns {any}
 */
export function ecadSearchParts(query, limit) {
    const val2 = +limit;
    const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadSearchParts(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Snap a position to the nearest component pin or grid point.
 *
 * # Arguments
 * * `x`, `y` - Cursor position
 * * `components_json` - JSON-serialized `SchematicComponent[]`
 * * `grid` - Grid spacing
 * * `threshold` - Max distance to snap to a pin
 *
 * # Returns
 * `{ position: { x, y }, is_pin: bool }` as JsValue.
 * @param {number} x
 * @param {number} y
 * @param {string} components_json
 * @param {number} grid
 * @param {number} threshold
 * @returns {any}
 */
export function ecadSnapToGridOrPin(x, y, components_json, grid, threshold) {
    const val2 = +x;
    const val3 = +y;
    const val4 = +grid;
    const val5 = +threshold;
    const ptr0 = passStringToWasm0(components_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.ecadSnapToGridOrPin(val2, val3, ptr0, len0, val4, val5);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Re-run a Receipt against the current board → `"Holds"` | `"Stale"` |
 * `"Violated"`.
 * @param {string} pcb_json
 * @param {string} receipt_json
 * @returns {any}
 */
export function ecadVerifyReceipt(pcb_json, receipt_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(receipt_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadVerifyReceipt(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * PROVE a substitution: swap `reference` on the board for the part that
 * `candidate_query` resolves to, re-derive its footprint, re-place at the
 * same anchor, re-run DRC (incl. connectivity), and return the before/after
 * delta with a `drop_in` verdict. `null` if the candidate is unresolvable.
 * @param {string} pcb_json
 * @param {string} reference
 * @param {string} candidate_query
 * @returns {any}
 */
export function ecadVerifySubstitution(pcb_json, reference, candidate_query) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(reference, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(candidate_query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.ecadVerifySubstitution(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Electromagnetic field simulation: 2D/axisymmetric finite-volume
 * magnetostatics and electrostatics with L / force / torque / C
 * extraction and predicted claims.
 *
 * `spec_json` must carry a `problem` tag: `axisym_magnetostatics`
 * (rest of spec = `vcad_kernel_em::spec::AxisymSpec`, named parameters
 * allowed), `planar_magnetostatics` (`PlanarSpec`, named parameters
 * allowed), or `electrostatics` (a literal-only electrode/dielectric
 * DTO — the crate has no serde seam for that class yet). `params_json`
 * binds named parameters; `options_json` is `EmSimOptions`.
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function emSimulate(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.emSimulate(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Tessellate an IR `EmbroideryDesign` (JSON) into a flat ribbon-quad
 * mesh at Z=0 with per-vertex thread colors — the kernel-side
 * equivalent of the engine's `embroideryPatternToMesh`.
 *
 * Returns `{ positions, indices, colors }`.
 * @param {string} design_json
 * @returns {any}
 */
export function embroideryDesignToMesh(design_json) {
    const ptr0 = passStringToWasm0(design_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.embroideryDesignToMesh(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Per-component Z extents from kernel component meshes (board-local).
 * @param {string} meshes_json
 * @param {string} pcb_json
 * @returns {string}
 */
export function enclosure_component_extents(meshes_json, pcb_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(meshes_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.enclosure_component_extents(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Edge connectors a board declares, each tagged with the nearest board edge.
 * @param {string} pcb_json
 * @param {string} outline_json
 * @returns {string}
 */
export function enclosure_connectors(pcb_json, outline_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(outline_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.enclosure_connectors(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Seed a board from a cavity: inset outline, a hole over every standoff, and
 * the placement that drops it back into the case.
 * @param {string} cavity_json
 * @param {string} standoffs_json
 * @param {string} options_json
 * @returns {string}
 */
export function enclosure_derive_board(cavity_json, standoffs_json, options_json) {
    let deferred5_0;
    let deferred5_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(cavity_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(standoffs_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.enclosure_derive_board(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Extract the cavity, standoffs, and wall openings from an enclosure solid's
 * triangle mesh (flat `[x,y,z,…]` positions + triangle indices).
 *
 * Returns `EnclosureFeatures` JSON; `cavity` is `null` when the solid has no
 * open-top pocket (e.g. a solid block).
 * @param {Float64Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {string}
 */
export function enclosure_features(positions, indices) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passArrayF64ToWasm0(positions, wasm.__wbindgen_malloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 8, 8); }
            throw e;
        }
        const ret = wasm.enclosure_features(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Run the four cross-domain fit checks. Takes `EnclosureFitInput` JSON,
 * returns `EnclosureFitReport` JSON.
 * @param {string} input_json
 * @returns {string}
 */
export function enclosure_fit(input_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(input_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.enclosure_fit(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Mounting holes a board declares (MountingHole footprints + NPTH pads), in
 * board-local coordinates. Takes `Pcb` JSON.
 * @param {string} pcb_json
 * @returns {string}
 */
export function enclosure_mounting_holes(pcb_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.enclosure_mounting_holes(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Axis-aligned bounds of a board outline polygon.
 * @param {string} outline_json
 * @returns {string}
 */
export function enclosure_outline_aabb(outline_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(outline_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.enclosure_outline_aabb(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Map a board-local point into the enclosure-world frame.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string} placement_json
 * @returns {string}
 */
export function enclosure_to_world(x, y, z, placement_json) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val2 = +x;
        const val3 = +y;
        const val4 = +z;
        const ptr0 = passStringToWasm0(placement_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.enclosure_to_world(val2, val3, val4, ptr0, len0);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Estimate print cost from volume (instant, pre-slice).
 * @param {number} volume_mm3
 * @param {number} infill_density
 * @param {number} wall_count
 * @param {number} line_width
 * @param {string} material_name
 * @returns {any}
 */
export function estimatePrintCost(volume_mm3, infill_density, wall_count, line_width, material_name) {
    const val2 = +volume_mm3;
    const val3 = +infill_density;
    const val4 = +wall_count;
    const val5 = +line_width;
    const ptr0 = passStringToWasm0(material_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.estimatePrintCost(val2, val3, val4, val5, ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Estimate manufacturing cost for the supplied process + material.
 *
 * `part_volume_mm3` is the exact part volume the caller has already
 * computed; `stock_volume_mm3` is only used for CNC (defaults to
 * `part_volume_mm3 * 2` if non-positive). `qty` matters for
 * mold/casting amortization; `feature_count` matters for CNC time.
 * Material names match the catalog in `vcad_kernel::vcad_kernel_cost::Material`.
 * @param {string} process
 * @param {string} material_name
 * @param {number} part_volume_mm3
 * @param {number} stock_volume_mm3
 * @param {number} qty
 * @param {number} feature_count
 * @returns {any}
 */
export function estimate_cost_for_process(process, material_name, part_volume_mm3, stock_volume_mm3, qty, feature_count) {
    const val3 = +part_volume_mm3;
    const val4 = +stock_volume_mm3;
    const val5 = +qty;
    const val6 = +feature_count;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(process, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(material_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.estimate_cost_for_process(ptr0, len0, ptr1, len1, val3, val4, val5, val6);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Convert a Transform3D Euler rotation in degrees (extrinsic XYZ, the
 * kernel's `R = Rz·Ry·Rx` convention) to a glTF quaternion `[x, y, z, w]`.
 * @param {number} x_deg
 * @param {number} y_deg
 * @param {number} z_deg
 * @returns {Float64Array}
 */
export function eulerXyzDegToQuat(x_deg, y_deg, z_deg) {
    const ret = wasm.eulerXyzDegToQuat(x_deg, y_deg, z_deg);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
}

/**
 * Evaluate loon source to a document stamped with its provenance
 * (`Document.source`: the program, its modules, `base_dir`/`path` when it
 * came from disk, and the SHA-256 hosts compare against the file) — the
 * session-minting form of [`eval_vcad_source_with_modules`].
 * @param {string} source
 * @param {string} modules_json
 * @param {string | null} [base_dir]
 * @param {string | null} [path]
 * @returns {string}
 */
export function evalLoonDocument(source, modules_json, base_dir, path) {
    let deferred6_0;
    let deferred6_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
        try {
            ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(modules_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(base_dir) ? 0 : passStringToWasm0(base_dir, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.evalLoonDocument(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Evaluate a loon source string and return a JSON-serialized vcad Document.
 *
 * The vcad library (types, constructors) is automatically prepended.
 * There is no filesystem in WASM, so `[use ...]` resolves against nothing
 * here — pass modules explicitly with [`eval_vcad_source_with_modules`].
 * @param {string} source
 * @returns {any}
 */
export function evalVcadSource(source) {
    const ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.evalVcadSource(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Evaluate loon source and return both the document and the parametric
 * warnings, as `{ "document": {...}, "warnings": ["..."] }`.
 *
 * Same evaluation as [`eval_vcad_source_with_modules`] — the document is
 * identical — but the warnings explain intent that could *not* be preserved:
 * a parameter that drives nothing, a field whose dependence on a parameter
 * is not affine and therefore keeps its literal. Callers that surface
 * authoring feedback (the MCP server, the app's editor) want this one;
 * callers that only need geometry can use the plain entry point.
 * @param {string} source
 * @param {string | null} [modules_json]
 * @returns {any}
 */
export function evalVcadSourceParametric(source, modules_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(modules_json) ? 0 : passStringToWasm0(modules_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.evalVcadSourceParametric(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Evaluate loon source whose `[use ...]` resolves against an in-memory
 * module map, and return a JSON-serialized vcad Document.
 *
 * `modules_json` is a JSON object of `{ "<module name>": "<loon source>" }`
 * — the browser's stand-in for a filesystem. `[use foo]` finds the entry
 * keyed `foo` (or `foo.loon`); the vcad library is available inside each
 * module, and `pub` controls what a module exports. Multi-file CAD projects
 * therefore behave identically here and on the native side, where the same
 * modules would be files on disk.
 * @param {string} source
 * @param {string} modules_json
 * @returns {any}
 */
export function evalVcadSourceWithModules(source, modules_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(modules_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.evalVcadSourceWithModules(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Evaluate a full vcad document JSON into a serialized EvaluatedScene.
 *
 * This is the canonical Rust-side evaluator that handles all CsgOp variants
 * including Sketch2D, Extrude, Revolve, Sweep, Loft, Text2D, ImportedMesh,
 * assembly with forward kinematics, and clash detection.
 *
 * # Arguments
 *
 * * `doc_json` - A JSON string representing a vcad Document
 * * `skip_clash_detection` - If true, skip O(n²) clash detection
 *
 * # Returns
 *
 * A JsValue containing the serialized EvaluatedScene.
 * @param {string} doc_json
 * @param {boolean} skip_clash_detection
 * @returns {any}
 */
export function evaluateDocument(doc_json, skip_clash_detection) {
    const val2 = +skip_clash_detection;
    const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.evaluateDocument(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Evaluate a sheet-metal op chain → mesh, flat pattern, summary, DXF.
 * @param {string} chain_json
 * @returns {string}
 */
export function evaluateSheetMetalChain(chain_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(chain_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.evaluateSheetMetalChain(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Evaluate VCode and return a Solid for rendering.
 *
 * This is a convenience function that parses VCode and evaluates
 * the geometry in a single step.
 *
 * # Arguments
 * * `vcode` - The VCode text to evaluate
 *
 * # Returns
 * A Solid object that can be rendered or queried.
 * @param {string} vcode
 * @returns {Solid}
 */
export function evaluateVCode(vcode) {
    const ptr0 = passStringToWasm0(vcode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.evaluateVCode(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Export a `Pcb` to a native, editable KiCad 9 `.kicad_pcb` board file.
 *
 * The inverse of [`parse_kicad_pcb`]: footprints, pads, nets, traces,
 * vias, zones, the layer table, and the board outline are serialized back
 * to S-expressions a human can open and finish in KiCad.
 *
 * # Arguments
 * * `pcb_json` - JSON-serialized `Pcb` struct
 *
 * # Returns
 * The `.kicad_pcb` file content as a string.
 * @param {string} pcb_json
 * @returns {string}
 */
export function exportKicadPcb(pcb_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.exportKicadPcb(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Export a linked KiCad 9 project bundle: `<name>.kicad_pro`,
 * `<name>.kicad_sch`, and `<name>.kicad_pcb`, with board footprints
 * carrying `(path …)` references to their schematic symbol uuids so
 * KiCad can cross-probe between the two editors.
 *
 * # Arguments
 * * `sheet_json` - JSON-serialized `SchematicSheet` struct
 * * `pcb_json` - JSON-serialized `Pcb` struct
 * * `name` - Project basename (no extension)
 *
 * # Returns
 * Array of `[filename, contents]` string pairs as JsValue.
 * @param {string} sheet_json
 * @param {string} pcb_json
 * @param {string} name
 * @returns {any}
 */
export function exportKicadProject(sheet_json, pcb_json, name) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(sheet_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.exportKicadProject(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Export a `SchematicSheet` to a native, editable KiCad 9 `.kicad_sch`
 * schematic file.
 *
 * # Arguments
 * * `sheet_json` - JSON-serialized `SchematicSheet` struct
 *
 * # Returns
 * The `.kicad_sch` file content as a string.
 * @param {string} sheet_json
 * @returns {string}
 */
export function exportKicadSch(sheet_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(sheet_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.exportKicadSch(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Export a projected view to DXF format.
 *
 * Returns the DXF content as bytes.
 *
 * # Arguments
 * * `view_json` - JSON string of a ProjectedView
 *
 * # Returns
 * A byte array containing the DXF file content.
 * @param {string} view_json
 * @returns {Uint8Array}
 */
export function exportProjectedViewToDxf(view_json) {
    const ptr0 = passStringToWasm0(view_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.exportProjectedViewToDxf(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Evaluate a previously parsed wire AST against `env` (a plain
 * `{ name: number }` object).
 * @param {any} ast
 * @param {any} env
 * @returns {number}
 */
export function exprEvalAst(ast, env) {
    const ret = wasm.exprEvalAst(ast, env);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Parse and evaluate an expression string in one shot.
 * @param {string} src
 * @param {any} env
 * @returns {number}
 */
export function exprEvaluate(src, env) {
    const ptr0 = passStringToWasm0(src, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.exprEvaluate(ptr0, len0, env);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Parse an expression string into its wire AST.
 * Errors carry the message `parse error at offset N: ...`.
 * @param {string} src
 * @returns {any}
 */
export function exprParse(src) {
    const ptr0 = passStringToWasm0(src, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.exprParse(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract a thin-wire `AntennaSpec` from a document's `PcbBoard` node
 * (antenna-net trace centerlines → wires of radius width/4, feed at a pad,
 * infinite ground at the pour edge — see `vcad_eval::antenna_extract`).
 *
 * `doc_json` is a `vcad_ir::Document`; `selection_json` an
 * `AntennaExtraction` (feed pad, optional net / board node, `f_max_hz`).
 * Returns `{spec, parameters, feed, frame, ground, substrate, notes, …}` —
 * feed `spec` and `parameters` straight to `antennaAnalyze`. Fail-closed.
 * @param {string} doc_json
 * @param {string} selection_json
 * @returns {any}
 */
export function extractAntennaSpec(doc_json, selection_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.extractAntennaSpec(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract an axisymmetric magnetostatic `AxisymSpec` from a document's
 * revolved magnetic parts (steel, axial magnets, coils).
 *
 * `selection_json` is a `vcad_eval::sim_extract::em::AxisymMagExtraction`.
 * Returns `{spec, parameters, axis, parts, grid}` — feed `spec` (with
 * `problem: "axisym_magnetostatics"`) and `parameters` to `emSimulate`,
 * on the advised `grid.nx × grid.ny`. Fail-closed: a non-axisymmetric
 * part errors with its name.
 * @param {string} doc_json
 * @param {string} selection_json
 * @returns {any}
 */
export function extractAxisymMagSpec(doc_json, selection_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.extractAxisymMagSpec(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract an axisymmetric `DeviceSpec` from a document's evaluated solids.
 *
 * `doc_json` is a `vcad_ir::Document`; `selection_json` a
 * `vcad_eval::sim_extract::DeviceExtraction` (chamber part, electrode
 * parts + the document parameters naming their potentials/ampere-turns).
 * Returns `{spec, parameters, cavity, ring_parts}` — feed `spec` and
 * `parameters` straight to `particleSimulate`. Fail-closed: any shape the
 * spec can't represent errors with the offending part's name.
 * @param {string} doc_json
 * @param {string} selection_json
 * @returns {any}
 */
export function extractDeviceSpec(doc_json, selection_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.extractDeviceSpec(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract a spherical `ShieldSpec` from a document's evaluated solids.
 *
 * `selection_json` is a `vcad_eval::sim_extract::ShieldExtraction` (shell
 * parts, fill material, source, detectors). Returns
 * `{spec, parameters, center, layer_parts}` — feed `spec` and
 * `parameters` straight to `neutronicsSimulate`.
 * @param {string} doc_json
 * @param {string} selection_json
 * @returns {any}
 */
export function extractShieldSpec(doc_json, selection_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.extractShieldSpec(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract a linear tolerance `StackupSpec` from a document's clearance
 * assertion and toleranced parameters.
 *
 * `selection_json` is a `vcad_eval::sim_extract::tolerance::StackupExtraction`.
 * Returns `{spec, parameters, gap_mm, fit_parts, contributors,
 * independent, fixed_geometry_mm}` — feed `spec` and `parameters` to
 * `toleranceAnalyze`.
 * @param {string} doc_json
 * @param {string} selection_json
 * @returns {any}
 */
export function extractStackupSpec(doc_json, selection_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.extractStackupSpec(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Static structural FEA of a closed evaluated mesh with fail-closed
 * mesh-convergence gating: the interior is filled with linear tets at
 * two (or more) lattice refinements and solved (linear elasticity, PCG);
 * QoIs must agree across levels or the verdict is Unverifiable and no
 * predicted claim is emitted.
 *
 * `spec_json` is a `vcad_kernel_fea::spec::FeaSpec` (material, loads,
 * supports, resolution), `options_json` a `FeaOptions`.
 * @param {string} spec_json
 * @param {string} options_json
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {any}
 */
export function feaAnalyzeMesh(spec_json, options_json, positions, indices) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 4, 4); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.feaAnalyzeMesh(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Closed-form check of a prismatic member: exact section properties,
 * beam bending with the Timoshenko shear term, Bredt thin-wall torsion (or
 * the Saint-Venant series for solid rectangles), and Euler buckling — with
 * the same fail-closed applicability gating and predicted-basis claims the
 * lattice route carries.
 *
 * This is the answer for sheet-metal and tube-frame members, where the
 * lattice pitch cannot resolve the wall at any affordable resolution. For a
 * constant cross-section it is not a fallback: it is the more accurate
 * number, and it costs microseconds.
 *
 * `case_json` is a `vcad_kernel_fea::section::BeamCase`.
 * @param {string} case_json
 * @returns {any}
 */
export function feaCheckBeam(case_json) {
    const ptr0 = passStringToWasm0(case_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.feaCheckBeam(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Closed-form external-pressure buckling screen for a thin cylinder,
 * sphere or dished head (vacuum chambers, viewport covers): classical
 * bifurcation pressure, the cited imperfection knockdown (NASA/SP-8007
 * REV 2 for cylinders, ASME VIII-1 UG-28(d)/UG-33 for spheres and heads),
 * membrane-yield cap, allowable and margin — with the same fail-closed
 * applicability gating and predicted-basis claims as the beam route.
 *
 * `case_json` is a `vcad_kernel_fea::shell::ShellCase`.
 * @param {string} case_json
 * @returns {any}
 */
export function feaCheckShell(case_json) {
    const ptr0 = passStringToWasm0(case_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.feaCheckShell(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Recover a flat pattern from an arbitrary constant-thickness solid mesh.
 * @param {string} request_json
 * @returns {string}
 */
export function flattenSolidToSheetMetal(request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.flattenSolidToSheetMetal(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Generate a 3MF file from mesh data.
 *
 * Returns the 3MF file as a byte array suitable for download or upload to a printer.
 * @param {string} name
 * @param {Float32Array | number[]} vertices
 * @param {Uint32Array | number[]} indices
 * @param {string} settings_json
 * @returns {Uint8Array}
 */
export function generate3mf(name, vertices, indices, settings_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passStringToWasm0(settings_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.generate3mf(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v5 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v5;
}

/**
 * Generate a Bambu sliced `.gcode.3mf` containing the mesh and the
 * pre-generated G-code, ready to send to a Bambu printer over LAN.
 * @param {string} name
 * @param {Float32Array | number[]} vertices
 * @param {Uint32Array | number[]} indices
 * @param {Uint8Array | number[]} gcode
 * @param {string} settings_json
 * @returns {Uint8Array}
 */
export function generate3mfWithGcode(name, vertices, indices, gcode, settings_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
    try {
        ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passArray8ToWasm0(gcode, wasm.__wbindgen_malloc);
        len3 = WASM_VECTOR_LEN;
        ptr4 = passStringToWasm0(settings_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len4 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr4) { wasm.__wbindgen_free(ptr4, len4 * 1, 1); }
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.generate3mfWithGcode(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v6 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v6;
}

/**
 * Generate G-code from slice result.
 * @param {SliceResult} result
 * @param {string} printer_profile
 * @param {number} print_temp
 * @param {number} bed_temp
 * @returns {string}
 */
export function generateGcode(result, printer_profile, print_temp, bed_temp) {
    let deferred5_0;
    let deferred5_1;
    try {
        _assertClass(result, SliceResult);
        const val2 = +print_temp;
        const val3 = +bed_temp;
        const ptr0 = passStringToWasm0(printer_profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.generateGcode(result.__wbg_ptr, ptr0, len0, val2, val3);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Returns the `WebAssembly.Module` instance backing this kernel-wasm
 * import. Workers can pass this to `wasm.default({ module_or_path })`
 * to skip the multi-second recompile of a fresh fetch — see
 * `packages/engine/src/eval-worker.ts` for the consumer.
 * @returns {any}
 */
export function getCompiledModule() {
    const ret = wasm.getCompiledModule();
    return ret;
}

/**
 * Return the full parts manifest JSON for the built-in stdlib.
 *
 * The app consumes this on boot to populate the palette's Parts tab and
 * the Cmd+K search index.
 * @returns {string}
 */
export function getPartsManifest() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.getPartsManifest();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Built-in bend-table rows.
 * @returns {string}
 */
export function getSheetMetalBendTable() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.getSheetMetalBendTable();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Built-in sheet-metal materials registry.
 * @returns {string}
 */
export function getSheetMetalMaterials() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.getSheetMetalMaterials();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Built-in shop bending catalog by id.
 * @param {string} shop_id
 * @returns {string}
 */
export function getSheetMetalShopCatalog(shop_id) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(shop_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.getSheetMetalShopCatalog(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Get available printer profiles.
 * @returns {any}
 */
export function getSlicerPrinterProfiles() {
    const ret = wasm.getSlicerPrinterProfiles();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Get the five Anthropic CRUD tool definitions
 * (`create` / `read` / `update` / `delete` / `set_material`) as a JSON
 * array, with the `create` tool's `type` enum pre-populated from the
 * kernel's tool schema list. Consumers on the web (TypeScript
 * `CommandRegistry.toAnthropicTools`) and in the TUI (`vcad_chat::
 * anthropic_tools`) render byte-identical payloads — single source of
 * truth lives in `vcad-chat::tools`.
 * @returns {string}
 */
export function get_anthropic_tools_json() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.get_anthropic_tools_json();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Return the bundled default rule pack (TOML) for a process or ruleset name.
 *
 * Process names: `"cnc_3axis"`, `"fdm"`, `"sla"`, `"injection"`,
 * `"sheet_metal"`, `"casting_sand"`, `"casting_investment"`. Named
 * rulesets: `"hobby-3axis-mill"`.
 * @param {string} process
 * @returns {string}
 */
export function get_default_dfm_pack(process) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(process, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.get_default_dfm_pack(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Get the kernel version string (the crate version).
 * Use this in the browser console to confirm the WASM loaded:
 * `kernelWasm.get_kernel_version()` returns `<crate-version>`.
 * @returns {string}
 */
export function get_kernel_version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.get_kernel_version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Get tool schema definitions for all CsgOp variants.
 * Returns JSON array of ToolSchemaEntry objects.
 * @returns {string}
 */
export function get_tool_schemas() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.get_tool_schemas();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Reduce a raw instrument file to measurements for the claims ledger
 * (`import_measurement`), fail-closed:
 *
 * - `"touchstone_s1p"`: NanoVNA one-port sweep → antenna measurements named
 *   after the claims (`vcad_kernel_antenna::nanovna`). `context_json` is
 *   `{claim_set: <vcad.antenna-claims/1>, tolerances?: {s11_db, freq_rel,
 *   z_ohm, bandwidth_rel}}` (unset tolerances keep the NanoVNA defaults).
 * - `"rew_impedance"`: REW impedance export → port tuning f_b
 *   (`vcad_kernel_acoustics::rew`). `context_json`: `{extra_uncertainty_hz?}`.
 * - `"thermocouple_csv"`: thermocouple log → one temperature
 *   (`vcad_kernel_thermal::thermocouple`). `context_json` is a
 *   `ThermocoupleOptions`.
 * @param {string} format
 * @param {string} text
 * @param {string} context_json
 * @returns {any}
 */
export function importMeasurementFile(format, text, context_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(context_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.importMeasurementFile(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Import solids from STEP file bytes.
 *
 * Returns a JS array of mesh data for each imported body.
 * Each mesh contains `positions` (Float32Array) and `indices` (Uint32Array).
 *
 * # Arguments
 * * `data` - Raw STEP file contents as bytes
 *
 * # Returns
 * A JS array of mesh objects for rendering the imported geometry.
 * @param {Uint8Array | number[]} data
 * @returns {any}
 */
export function importStepBuffer(data) {
    const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.importStepBuffer(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Import solids from STEP file bytes, reporting skipped faces.
 *
 * Like [`import_step_buffer`], but returns `{ meshes, report, summary }`
 * where `report` lists, per solid, any faces omitted because their surface
 * type is unsupported (the imported geometry has holes there), and
 * `summary` is a ready-to-display warning string (null when clean).
 * @param {Uint8Array | number[]} data
 * @returns {any}
 */
export function importStepBufferWithReport(data) {
    const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.importStepBufferWithReport(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Tessellated STEP import straight to a document: parse, mesh every solid
 * and build one `ImportedMesh` root per body in Rust, so the meshes never
 * cross into JS as separate buffers. Returns `{document (JSON string),
 * report, summary, triangles, vertices}`.
 * @param {Uint8Array | number[]} data
 * @param {string} part_name
 * @param {string} material
 * @param {string} source
 * @returns {any}
 */
export function importStepMeshDocument(data, part_name, material, source) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(part_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(material, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.importStepMeshDocument(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Import a URDF (Unified Robot Description Format) file and return a
 * serialised vcad `Document`.
 *
 * Browsers cannot resolve `package://` URIs or relative mesh paths
 * against the user's filesystem, so any `<mesh>` reference in the URDF
 * falls back to a 1cm placeholder cube — the kinematic + inertial tree
 * is still imported correctly. Loading STL/DAE meshes in the browser
 * would require either uploading them alongside or vendoring them.
 *
 * # Arguments
 *
 * * `data` - Raw URDF XML bytes (UTF-8).
 *
 * # Returns
 *
 * JSON-encoded `Document` string. The web app parses it via
 * `Document.fromJson` (TS) or `vcad_ir::Document::from_json` (Rust).
 * @param {Uint8Array | number[]} data
 * @returns {string}
 */
export function importUrdfBuffer(data) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.importUrdfBuffer(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Import a URDF, optionally synthesizing a floating (6-DOF) base.
 *
 * Most humanoid/quadruped URDFs ship the `world` link and its
 * `type="floating"` joint commented out, on the convention that the
 * simulator supplies the free base. Without it the root link is grounded
 * and the robot is welded to the world — useless for locomotion. Passing
 * `floating_base` injects exactly that commented-out block.
 *
 * # Arguments
 *
 * * `data` - Raw URDF XML bytes (UTF-8).
 * * `floating_base` - Synthesize the world link + `Free` joint.
 * * `root_link` - Link to attach it to (default: the tree's root link).
 * * `spawn_height_mm` - Initial base height in mm, written as the joint's
 *   `parentAnchor.z` (a `Free` joint's scalar `state` cannot carry it).
 *   `undefined` keeps whatever origin the URDF authored, and applies to a
 *   floating joint the URDF already declares — not only a synthesized one.
 * @param {Uint8Array | number[]} data
 * @param {boolean} floating_base
 * @param {string | null} [root_link]
 * @param {number | null} [spawn_height_mm]
 * @returns {string}
 */
export function importUrdfBufferWithOptions(data, floating_base, root_link, spawn_height_mm) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val3 = +floating_base;
        const val4 = +(isLikeNone(spawn_height_mm) ? 0 : spawn_height_mm);
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(root_link) ? 0 : passStringToWasm0(root_link, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.importUrdfBufferWithOptions(ptr0, len0, val3, ptr1, len1, !isLikeNone(spawn_height_mm), val4);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Initialize the WASM module (sets up panic hook for better error messages).
 */
export function init() {
    wasm.init();
}

/**
 * Initialize the GPU context for accelerated geometry processing.
 *
 * Returns `true` if WebGPU is available and initialized, `false` otherwise.
 * This should be called once at application startup.
 * @returns {Promise<boolean>}
 */
export function initGpu() {
    const ret = wasm.initGpu();
    return ret;
}

/**
 * Rewrite `MeshImport` nodes to inline `ImportedMesh` geometry from STL
 * bytes the host read (metres → mm, URDF `<mesh scale>` applied), via
 * `vcad_eval::mesh_inline`. `keys[i]` is the node id whose STL is
 * `blobs[i]` (a `Uint8Array`). Returns
 * `{document, inlined, errors: [[key, reason], ...]}`.
 * @param {string} doc_json
 * @param {string[]} keys
 * @param {Array<any>} blobs
 * @returns {string}
 */
export function inlineMeshImports(doc_json, keys, blobs) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArrayJsValueToWasm0(keys, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__externref_drop_slice(ptr1, len1); wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.inlineMeshImports(ptr0, len0, ptr1, len1, blobs);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Enumerate the B-rep faces of every visible scene root.
 *
 * The mesh-based inspection tools (`inspect_cad`, `measure`) are
 * tessellation-bound and topology-blind: they cannot say which face is a
 * mounting plane, what a bore's diameter is, or where a shaft axis points.
 * This walks the kernel B-rep instead and reports, per face, a stable
 * identifier, surface type, area, bbox, centroid and the *analytic* surface
 * parameters, plus per-part face groupings and coaxial-cylinder groups
 * (the honest answer to "true outer diameter" on a part whose bounding box
 * is inflated by a boss).
 *
 * # Arguments
 *
 * * `doc_json` - A JSON string representing a vcad Document
 *
 * # Returns
 *
 * A JSON string: `{ "parts": [{ node_id, name, brep: bool, error?, report? }],
 * "units": "mm" }`. Mesh-only roots report `brep: false` with an `error`
 * rather than a tessellation-derived guess.
 * @param {string} doc_json
 * @returns {string}
 */
export function inspectDocumentFaces(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.inspectDocumentFaces(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Check if CAM is available.
 * @returns {boolean}
 */
export function isCamAvailable() {
    const ret = wasm.isCamAvailable();
    return ret !== 0;
}

/**
 * Check if ECAD features are available in this build.
 * @returns {boolean}
 */
export function isEcadAvailable() {
    const ret = wasm.isEcadAvailable();
    return ret !== 0;
}

/**
 * Check if embroidery support is available.
 * @returns {boolean}
 */
export function isEmbroideryAvailable() {
    const ret = wasm.isEmbroideryAvailable();
    return ret !== 0;
}

/**
 * Check if GPU processing is available.
 * @returns {boolean}
 */
export function isGpuAvailable() {
    const ret = wasm.isGpuAvailable();
    return ret !== 0;
}

/**
 * Check if physics simulation is available.
 * @returns {boolean}
 */
export function isPhysicsAvailable() {
    const ret = wasm.isPhysicsAvailable();
    return ret !== 0;
}

/**
 * Check if slicer is available.
 * @returns {boolean}
 */
export function isSlicerAvailable() {
    const ret = wasm.isSlicerAvailable();
    return ret !== 0;
}

/**
 * Lattice gauge theory Monte Carlo (quenched SU(2)/SU(3) Wilson action):
 * plaquette, Wilson loops, string tension (Creutz ratios + static
 * potential + Cornell fit), Polyakov deconfinement order parameter,
 * flux-tube profile, and rendering field snapshots — every observable a
 * binned-jackknife mean ± error, deterministic per seed.
 *
 * `spec_json` is a `vcad_kernel_qcd::spec::SimSpec`.
 * @param {string} spec_json
 * @returns {any}
 */
export function latticeGaugeSimulate(spec_json) {
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.latticeGaugeSimulate(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Magnetic field of posed 3D sources (current loops, solenoids, disc/ring
 * and block magnets) at query points or on a plane grid.
 *
 * `scene_json` is a `vcad_kernel_particle::field3d_spec::SceneSpec`
 * (mm / degrees / A / T), `query_json` a `QuerySpec` (points and/or grid,
 * optional ∇|B|). Fail-closed: invalid geometry, an oversized grid, or a
 * query point on a source singularity is an error. Returns a `FieldReport`
 * (B vectors in tesla, |B|, per-source method + dipole moment).
 * @param {string} scene_json
 * @param {string} query_json
 * @returns {any}
 */
export function magneticField(scene_json, query_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(scene_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.magneticField(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Mesh-to-mesh clearance over raw evaluated-mesh buffers (see
 * `WasmClearance`). Operates on already-placed geometry, so callers can
 * measure between any two evaluated parts (or merged part groups) without
 * re-building solids.
 * @param {Float32Array | number[]} positions_a
 * @param {Uint32Array | number[]} indices_a
 * @param {Float32Array | number[]} positions_b
 * @param {Uint32Array | number[]} indices_b
 * @returns {any}
 */
export function mesh_clearance(positions_a, indices_a, positions_b, indices_b) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passArrayF32ToWasm0(positions_a, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices_a, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArrayF32ToWasm0(positions_b, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passArray32ToWasm0(indices_b, wasm.__wbindgen_malloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 4, 4); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.mesh_clearance(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Rectangular nesting of part footprints on stock sheets.
 * @param {string} parts_json
 * @param {string} params_json
 * @returns {string}
 */
export function nestSheetMetalParts(parts_json, params_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(parts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.nestSheetMetalParts(ptr0, len0, ptr1, len1);
        deferred3_0 = ret[0];
        deferred3_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * One layered DXF per nested stock sheet.
 * @param {string} placements_json
 * @returns {string}
 */
export function nestedSheetMetalDxf(placements_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(placements_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nestedSheetMetalDxf(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Monte Carlo neutron shielding run: spherical layer stack, D-D-band
 * point source, dose at detector shells WITH statistical error bars, and
 * predicted claims (fail-closed: truncated histories or unscored tallies
 * refuse to price claims).
 *
 * `spec_json` is a `vcad_kernel_neutronics::spec::ShieldSpec` (named
 * parameters allowed; histories/batches/seed ride inside its `run`
 * block), `params_json` a `{name: value}` map binding them.
 * @param {string} spec_json
 * @param {string} params_json
 * @returns {any}
 */
export function neutronicsSimulate(spec_json, params_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.neutronicsSimulate(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Room-scale (3D CSG) Monte Carlo neutron run: priority-ordered
 * box/sphere/cylinder cells (chamber, HDPE castle, concrete room), a
 * point source, virtual detectors with instrument responses (moderated
 * ³He/BF₃ counter computed by MC, bubble dosimeter, CR-39, ideal rem
 * meter) and an optional voxel H*(10) dose map — every number with its
 * batch-statistics RSE, plus predicted claims (fail-closed).
 *
 * `spec_json` is a `vcad_kernel_neutronics::scene_spec::SceneSpec`,
 * `params_json` a `{name: value}` map binding named parameters.
 * @param {string} spec_json
 * @param {string} params_json
 * @returns {any}
 */
export function neutronicsSimulateScene(spec_json, params_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.neutronicsSimulateScene(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse a note name (`"C6"`, `"F#4"`, `"Bb3"`) to Hz. Errors on garbage.
 * @param {string} note
 * @returns {number}
 */
export function noteToHz(note) {
    const ptr0 = passStringToWasm0(note, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.noteToHz(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Generate an offset (stepped) section view from a triangle mesh.
 *
 * # Arguments
 * * `mesh_js` - Mesh data as JS object with `positions` (Float32Array) and `indices` (Uint32Array)
 * * `plane_json` - JSON `OffsetSectionPlane`: `{"base": {"origin": [x,y,z], "normal": [x,y,z], "up": [x,y,z]}, "steps": [{"u_start": f64, "u_end": f64, "offset": f64}]}`
 * * `hatch_json` - Optional JSON hatch pattern: `{"spacing": f64, "angle": f64}`
 *
 * # Returns
 * A JS object containing the section view with curves, hatch lines, and bounds.
 * @param {any} mesh_js
 * @param {string} plane_json
 * @param {string | null} [hatch_json]
 * @returns {any}
 */
export function offsetSectionMesh(mesh_js, plane_json, hatch_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(hatch_json) ? 0 : passStringToWasm0(hatch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.offsetSectionMesh(mesh_js, ptr0, len0, ptr1, len1);
    return ret;
}

/**
 * Chamfer all edges of a solid by the given distance.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {Solid} solid
 * @param {number} distance
 * @returns {Solid}
 */
export function op_chamfer(solid, distance) {
    _assertClass(solid, Solid);
    const ret = wasm.op_chamfer(solid.__wbg_ptr, distance);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Create a circular pattern of a solid around an axis.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {Solid} solid
 * @param {number} axis_origin_x
 * @param {number} axis_origin_y
 * @param {number} axis_origin_z
 * @param {number} axis_dir_x
 * @param {number} axis_dir_y
 * @param {number} axis_dir_z
 * @param {number} count
 * @param {number} angle_deg
 * @returns {Solid}
 */
export function op_circular_pattern(solid, axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, count, angle_deg) {
    _assertClass(solid, Solid);
    const ret = wasm.op_circular_pattern(solid.__wbg_ptr, axis_origin_x, axis_origin_y, axis_origin_z, axis_dir_x, axis_dir_y, axis_dir_z, count, angle_deg);
    return Solid.__wrap(ret);
}

/**
 * Fillet all edges of a solid with the given radius.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {Solid} solid
 * @param {number} radius
 * @returns {Solid}
 */
export function op_fillet(solid, radius) {
    _assertClass(solid, Solid);
    const ret = wasm.op_fillet(solid.__wbg_ptr, radius);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Create a linear pattern of a solid along a direction.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {Solid} solid
 * @param {number} dir_x
 * @param {number} dir_y
 * @param {number} dir_z
 * @param {number} count
 * @param {number} spacing
 * @returns {Solid}
 */
export function op_linear_pattern(solid, dir_x, dir_y, dir_z, count, spacing) {
    _assertClass(solid, Solid);
    const ret = wasm.op_linear_pattern(solid.__wbg_ptr, dir_x, dir_y, dir_z, count, spacing);
    return Solid.__wrap(ret);
}

/**
 * Create a solid by lofting between multiple profiles.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {string} profiles_json
 * @param {boolean | null} [closed]
 * @returns {Solid}
 */
export function op_loft(profiles_json, closed) {
    const ptr0 = passStringToWasm0(profiles_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.op_loft(ptr0, len0, isLikeNone(closed) ? 0xFFFFFF : closed ? 1 : 0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Create a solid by revolving a 2D sketch profile around an axis.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {string} profile_json
 * @param {Float64Array | number[]} axis_origin
 * @param {Float64Array | number[]} axis_dir
 * @param {number} angle_deg
 * @returns {Solid}
 */
export function op_revolve(profile_json, axis_origin, axis_dir, angle_deg) {
    const val4 = +angle_deg;
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF64ToWasm0(axis_origin, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArrayF64ToWasm0(axis_dir, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.op_revolve(ptr0, len0, ptr1, len1, ptr2, len2, val4);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Shell (hollow) a solid by offsetting all faces inward.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {Solid} solid
 * @param {number} thickness
 * @returns {Solid}
 */
export function op_shell(solid, thickness) {
    _assertClass(solid, Solid);
    const ret = wasm.op_shell(solid.__wbg_ptr, thickness);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Create a solid by sweeping a profile along a helix path.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {string} profile_json
 * @param {number} radius
 * @param {number} pitch
 * @param {number} height
 * @param {number} turns
 * @param {number | null} [twist_angle]
 * @param {number | null} [scale_start]
 * @param {number | null} [scale_end]
 * @param {number | null} [path_segments]
 * @param {number | null} [arc_segments]
 * @param {number | null} [orientation]
 * @returns {Solid}
 */
export function op_sweep_helix(profile_json, radius, pitch, height, turns, twist_angle, scale_start, scale_end, path_segments, arc_segments, orientation) {
    const val2 = +radius;
    const val3 = +pitch;
    const val4 = +height;
    const val5 = +turns;
    const val6 = +(isLikeNone(twist_angle) ? 0 : twist_angle);
    const val7 = +(isLikeNone(scale_start) ? 0 : scale_start);
    const val8 = +(isLikeNone(scale_end) ? 0 : scale_end);
    const val9 = +(isLikeNone(path_segments) ? Number.MAX_SAFE_INTEGER : (path_segments) >>> 0);
    const val10 = +(isLikeNone(arc_segments) ? Number.MAX_SAFE_INTEGER : (arc_segments) >>> 0);
    const val11 = +(isLikeNone(orientation) ? 0 : orientation);
    const ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.op_sweep_helix(ptr0, len0, val2, val3, val4, val5, !isLikeNone(twist_angle), val6, !isLikeNone(scale_start), val7, !isLikeNone(scale_end), val8, val9, val10, !isLikeNone(orientation), val11);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Create a solid by sweeping a profile along a line path.
 *
 * This is a standalone wrapper for lazy loading via wasmosis.
 * @param {string} profile_json
 * @param {Float64Array | number[]} start
 * @param {Float64Array | number[]} end
 * @param {number | null} [twist_angle]
 * @param {number | null} [scale_start]
 * @param {number | null} [scale_end]
 * @param {number | null} [orientation]
 * @returns {Solid}
 */
export function op_sweep_line(profile_json, start, end, twist_angle, scale_start, scale_end, orientation) {
    const val4 = +(isLikeNone(twist_angle) ? 0 : twist_angle);
    const val5 = +(isLikeNone(scale_start) ? 0 : scale_start);
    const val6 = +(isLikeNone(scale_end) ? 0 : scale_end);
    const val7 = +(isLikeNone(orientation) ? 0 : orientation);
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(profile_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF64ToWasm0(start, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArrayF64ToWasm0(end, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 8, 8); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 8, 8); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.op_sweep_line(ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(twist_angle), val4, !isLikeNone(scale_start), val5, !isLikeNone(scale_end), val6, !isLikeNone(orientation), val7);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Solid.__wrap(ret[0]);
}

/**
 * Optimize named document parameters: minimize a weighted sum of QoIs
 * subject to parameter-expression and QoI constraints
 * ([`vcad_eval::optimize::optimize_document`]). Returns the
 * [`vcad_eval::optimize::OptimizeDocResult`] — the optimum, the KKT report,
 * and the full trajectory with every gradient component's provenance.
 *
 * Only the built-in seam QoIs (volume, mass, centroid) are available here:
 * solver plug-ins (modal frequency, …) register through the native Rust API
 * (`vcad_eval::optimize::QoiRegistry`), not in the browser kernel.
 * @param {string} doc_json
 * @param {string} request_json
 * @returns {any}
 */
export function optimizeDocument(doc_json, request_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.optimizeDocument(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse an Altium ASCII-exported `.PcbDoc` into a `Pcb`.
 *
 * # Arguments
 * * `content` - The ASCII `.PcbDoc` text (*File ▸ Save As ▸ PCB ASCII*)
 *
 * # Returns
 * JSON-serialized `Pcb` struct as JsValue, or error.
 * @param {string} content
 * @returns {any}
 */
export function parseAltiumAsciiPcb(content) {
    const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseAltiumAsciiPcb(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse a native binary Altium `.PcbDoc` (OLE compound file) into a `Pcb`.
 *
 * Fails closed: a primitive stream whose record layout this importer does
 * not recognise aborts the import rather than yielding a partially-correct
 * board. The error message names the ASCII export as the fallback.
 *
 * # Arguments
 * * `bytes` - Raw `.PcbDoc` file bytes
 *
 * # Returns
 * JSON-serialized `Pcb` struct as JsValue, or error.
 * @param {Uint8Array | number[]} bytes
 * @returns {any}
 */
export function parseAltiumPcbDoc(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseAltiumPcbDoc(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse an Altium `.PcbLib` footprint library (binary or ASCII).
 *
 * # Arguments
 * * `bytes` - Raw `.PcbLib` file bytes
 *
 * # Returns
 * JSON-serialized `FootprintLib` struct as JsValue, or error.
 * @param {Uint8Array | number[]} bytes
 * @returns {any}
 */
export function parseAltiumPcbLib(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseAltiumPcbLib(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse an Eagle `.brd` (XML, Eagle 6+) board into a `Pcb`.
 *
 * # Arguments
 * * `content` - The `.brd` file content as a string
 *
 * # Returns
 * JSON-serialized `Pcb` struct as JsValue, or error.
 * @param {string} content
 * @returns {any}
 */
export function parseEagleBrd(content) {
    const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseEagleBrd(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse a KiCad `.kicad_pcb` file content into a JSON-serialized `Pcb`.
 *
 * # Arguments
 * * `content` - The `.kicad_pcb` file content as a string
 *
 * # Returns
 * JSON-serialized `Pcb` struct as JsValue, or error.
 * @param {string} content
 * @returns {any}
 */
export function parseKicadPcb(content) {
    const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseKicadPcb(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse VCode text format into a vcad IR Document (JSON).
 *
 * The VCode format is a token-efficient text representation designed
 * for ML model training and inference. See `vcad_ir::vcode` for format details.
 *
 * # Arguments
 * * `vcode` - The VCode text to parse
 *
 * # Returns
 * A JSON string representing the parsed vcad IR Document.
 *
 * # Example
 * ```javascript
 * const ir = "C 50 30 5\nY 5 10\nT 1 25 15 0\nD 0 2";
 * const doc = parseVCode(ir);
 * console.log(doc); // JSON document
 * ```
 * @param {string} vcode
 * @returns {string}
 */
export function parseVCode(vcode) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(vcode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.parseVCode(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Parse a .vcad file (JSON v0.1, VCode v0.2, or loon v0.3).
 *
 * Returns a JSON-serialized VcadFile with document, parts, and metadata.
 * @param {string} content
 * @returns {any}
 */
export function parseVcadFile(content) {
    const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parseVcadFile(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Describe a built-in part: its mate ports (part-local frame) and metadata
 * (ratings, envelopes, provenance, BOM lines), as JSON
 * `{ "ports": [...], "metadata": {...} }`. Parts without a describer return
 * no ports and empty metadata.
 * @param {string} path
 * @param {string} params_json
 * @returns {string}
 */
export function partInfo(path, params_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.partInfo(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Optimize named device parameters against predicted D-D yield per ion.
 *
 * `optimize_json`: `{ variables: [{name, lo, hi, start?}], nr?, nz?,
 * particles?, max_passes?, max_iters?, multi_start?, gradient?,
 * adjoint_particles?, adjoint_crossings? }` — an
 * `electrode_opt::ElectrodeOptProblem`. Multi-start ascent (the yield
 * landscape is multimodal — see `docs/particle-optics-m0.md`).
 * `gradient: "fd"` (default) uses central differences throughout;
 * `"hybrid"` routes potentials + ampere-turns through the discrete
 * adjoint and geometry through FD, falling back to FD on an iteration
 * whose adjoint direction fails to climb. Candidate configurations that
 * fail to resolve or converge score 0 instead of aborting the search.
 * Output keeps `best_params / best_sigma_v_m3 / evals / history /
 * starts[{params, value}]` and adds per-iteration records with the
 * gradient source of every variable.
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} optimize_json
 * @returns {any}
 */
export function particleOptimize(spec_json, params_json, optimize_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(optimize_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.particleOptimize(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Charged-particle optics simulation: solve the device's fields, trace a
 * deuteron ensemble, and return figures of merit plus predicted claims.
 *
 * `spec_json` is a `vcad_kernel_particle::spec::DeviceSpec` (named
 * parameters allowed), `params_json` a `{name: value}` map binding them
 * (fail-closed: unbound names error), `options_json` a
 * `ParticleSimOptions`. Returns stats + `vcad.particle-claims/1` set +
 * unified-receipt claims (basis `predicted` — Provisional by contract).
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function particleSimulate(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.particleSimulate(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * 3D charged-particle optics: resolve a `vcad_kernel_particle::spec3d::
 * DeviceSpec3d` (named parameters, fail-closed), solve it with the
 * thin-wire BEM (refusing geometries that fail the surface-residual
 * gates), trace a full-sphere Fibonacci deuteron ensemble, and return
 * figures of merit. No receipt claims are issued for 3D yet (see
 * `WasmParticleSim3d::note`).
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function particleSimulate3d(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.particleSimulate3d(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Forward 2D TM FDTD run of a rect-composed photonic device: slab-mode
 * line source, input + output flux monitors, transmission spectrum, and
 * predicted claims (the splitter claim family; a single-output device
 * reads arm B as zero).
 * @param {string} spec_json
 * @param {string} options_json
 * @returns {any}
 */
export function photonicsSimulate(spec_json, options_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.photonicsSimulate(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {string} tool
 * @param {string} args_json
 * @param {string} doc_json
 * @returns {string}
 */
export function plan_chat_tool(tool, args_json, doc_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(tool, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.plan_chat_tool(ptr0, len0, ptr1, len1, ptr2, len2);
        deferred4_0 = ret[0];
        deferred4_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Process geometry with GPU acceleration.
 *
 * Computes creased normals and optionally generates LOD meshes.
 *
 * # Arguments
 * * `positions` - Flat array of vertex positions (x, y, z, ...)
 * * `indices` - Triangle indices
 * * `crease_angle` - Angle in radians for creased normal computation
 * * `generate_lod` - If true, returns multiple LOD levels
 *
 * # Returns
 * A JS array of geometry results. If `generate_lod` is true, returns
 * [full, 50%, 25%] detail levels. Otherwise returns a single mesh.
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @param {number} crease_angle
 * @param {boolean} generate_lod
 * @returns {Promise<any>}
 */
export function processGeometryGpu(positions, indices, crease_angle, generate_lod) {
    const val3 = +crease_angle;
    const val4 = +generate_lod;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.processGeometryGpu(ptr0, len0, ptr1, len1, val3, val4);
    return ret;
}

/**
 * Project a triangle mesh to a 2D view.
 *
 * # Arguments
 * * `mesh_js` - Mesh data as JS object with `positions` (Float32Array) and `indices` (Uint32Array)
 * * `view_direction` - View direction: "front", "back", "top", "bottom", "left", "right", or "isometric"
 *
 * # Returns
 * A JS object containing the projected view with edges and bounds.
 * @param {any} mesh_js
 * @param {string} view_direction
 * @returns {any}
 */
export function projectMesh(mesh_js, view_direction) {
    const ptr0 = passStringToWasm0(view_direction, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.projectMesh(mesh_js, ptr0, len0);
    return ret;
}

/**
 * Read a DST file and return embroidery data as JSON.
 * @param {Uint8Array | number[]} data
 * @returns {string}
 */
export function readEmbroideryDst(data) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.readEmbroideryDst(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Read a PES file and return embroidery data as JSON.
 *
 * Returns `{ threads, stitchPaths, stats }` as a JSON string.
 * @param {Uint8Array | number[]} data
 * @returns {string}
 */
export function readEmbroideryPes(data) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.readEmbroideryPes(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Recommend smart print settings from analysis results.
 *
 * Takes a PrintAnalysis JSON and printer profile name,
 * returns recommended SliceSettings + explanations.
 * @param {string} analysis_json
 * @param {string} printer_profile
 * @returns {any}
 */
export function recommendPrintSettings(analysis_json, printer_profile) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(analysis_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(printer_profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.recommendPrintSettings(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Refine tessellated part-pair clearances with the closed form for
 * parallel cylinders (shaft in bore, pins side by side), so chord error
 * can't turn a 0.02 mm running fit into an "interference". `query_json`
 * is `{pairs: [{a, b, distance, intersecting, point_a, point_b}]}` (the
 * `meshClearance` result per pair, part ids as clearance specs name them);
 * returns one entry per pair — `null` when a part isn't a BRep root (keep
 * the mesh number), else `{distance, intersecting, point_a, point_b,
 * basis, mesh_distance, chord_band_mm?}`.
 * @param {string} doc_json
 * @param {string} query_json
 * @returns {any}
 */
export function refineClearance(doc_json, query_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.refineClearance(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Register STEP file bytes under `path` so `step_import` nodes resolve.
 *
 * The WASM kernel has no filesystem, so a `step_import` node — the B-rep
 * preserving import form — cannot open its own file here. Registering the
 * bytes under the exact path the node stores lets the evaluator resolve real
 * B-rep instead of nothing, which is what keeps analytic faces alive through
 * booleans, fillets, and STEP export.
 *
 * Returns `{ path, solids, report, summary }`: per-solid B-rep stats (so a
 * caller can emit one node per body and verify each is B-rep-backed) plus the
 * skipped-face report, which is otherwise silent.
 * @param {string} path
 * @param {Uint8Array | number[]} data
 * @returns {any}
 */
export function registerStepSource(path, data) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.registerStepSource(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run the render-bake pipeline on a raw triangle mesh.
 *
 * Used by the imported-mesh path (STL / STEP drops) so meshes that arrive
 * from outside the kernel get the same post-processing as kernel-emitted
 * meshes: angle-based creased vertex normals today, tangent generation and
 * LOD baking later. Positions and indices may be duplicated (the mesh
 * becomes unindexed) so downstream consumers just upload the returned
 * arrays.
 *
 * Input is `{ positions: Float32Array, indices: Uint32Array, crease_angle_rad?: f64 }`
 * encoded as JSON. Returns `{ positions, indices, normals }` with the same
 * encoding.
 * @param {string} input_json
 * @returns {string}
 */
export function renderBakeMesh(input_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(input_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.renderBakeMesh(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Render a BOM table as drawing primitives, bottom-left corner at (0, 0).
 *
 * # Arguments
 * * `rows_json` - JSON array of `BomRow`: `[{"item": 1, "name": "...", "qty": 2, "material": "..."}]`
 *
 * # Returns
 * `{ rendered: RenderedDimension, width: f64, height: f64 }`, or null on
 * parse failure.
 * @param {string} rows_json
 * @returns {any}
 */
export function renderBomTable(rows_json) {
    const ptr0 = passStringToWasm0(rows_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.renderBomTable(ptr0, len0);
    return ret;
}

/**
 * Render a title block as drawing primitives, bottom-left corner at (0, 0).
 *
 * # Arguments
 * * `fields_json` - JSON `TitleBlockFields`: `{"part_name": "...", "material": "...", "finish": "...", "scale": "...", "drawn_by": "...", "date": "...", "revision": "...", "units": "...", "tolerance_note": "..."}`
 *
 * # Returns
 * `{ rendered: RenderedDimension, width: f64, height: f64 }`, or null on
 * parse failure.
 * @param {string} fields_json
 * @returns {any}
 */
export function renderTitleBlock(fields_json) {
    const ptr0 = passStringToWasm0(fields_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.renderTitleBlock(ptr0, len0);
    return ret;
}

/**
 * Render a PCB to a flat, top-down, per-layer 2D SVG (the "agent eyes" for
 * boards — copper, silk, drills, outline).
 *
 * `pcb_json` is a JSON-serialized `Pcb`; `layers_json` is a JSON array of
 * layer-name strings accepting both KiCad (`"F.Cu"`, `"F.SilkS"`) and serde
 * (`"FCu"`, `"FSilkS"`) spellings. Only the requested layers are drawn.
 * @param {string} pcb_json
 * @param {string} layers_json
 * @param {number} scale
 * @returns {string}
 */
export function render_pcb_svg(pcb_json, layers_json, scale) {
    let deferred5_0;
    let deferred5_1;
    try {
        const val3 = +scale;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(layers_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_pcb_svg(ptr0, len0, ptr1, len1, val3);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Render a PCB with explicit render options (the "Studio Graphite" theme
 * system). Backward-compatible companion to [`render_pcb_svg`]: the 3-arg
 * form keeps working and now defaults to the dark theme.
 *
 * `opts_json` is an options object (empty string = defaults), e.g.
 * `{"theme":"dark","values":true,"netLabels":false,"ratsnest":true,
 *   "grid":true,"hero":false,"highlight":{"nets":["GND"],"refs":["U1"]}}`.
 * `theme` is `"dark"` (default) or `"light"` (legacy fab look); `highlight`
 * recolours the named nets/refs to the brand pink with a glow and dims the
 * rest — the agent affordance for "show me net X".
 * @param {string} pcb_json
 * @param {string} layers_json
 * @param {number} scale
 * @param {string} opts_json
 * @returns {string}
 */
export function render_pcb_svg_opts(pcb_json, layers_json, scale, opts_json) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val4 = +scale;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(pcb_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(layers_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_pcb_svg_opts(ptr0, len0, ptr1, len1, val4, ptr2, len2);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to a drafting-style isometric SVG.
 *
 * Thin wrapper over `vcad_render::render_svg_str` — the same renderer the
 * `vcad-render` CLI and the mecheval leaderboard use, so agents and humans
 * see identical linework. `scale` is pixels per millimetre (pass
 * `vcad_render::DEFAULT_SCALE` = 2.0 when in doubt).
 * @param {string} vcad_json
 * @param {number} scale
 * @returns {string}
 */
export function render_svg(vcad_json, scale) {
    let deferred4_0;
    let deferred4_1;
    try {
        const val2 = +scale;
        const ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.render_svg(ptr0, len0, val2);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to an SVG with opt-in engineering
 * annotations: an X/Y/Z origin gizmo (`axes`), part-name labels with
 * leader lines (`labels`), and overall W×D×H bounding-box dimensions in mm
 * (`dims`). With all three flags false the output matches
 * [`render_svg_view`] exactly. `view` parses as in [`render_svg_view`].
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} view
 * @param {boolean} axes
 * @param {boolean} labels
 * @param {boolean} dims
 * @returns {string}
 */
export function render_svg_annotated(vcad_json, scale, view, axes, labels, dims) {
    let deferred8_0;
    let deferred8_1;
    try {
        const val3 = +scale;
        const val4 = +axes;
        const val5 = +labels;
        const val6 = +dims;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(view, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_annotated(ptr0, len0, val3, ptr1, len1, val4, val5, val6);
        var ptr7 = ret[0];
        var len7 = ret[1];
        if (ret[3]) {
            ptr7 = 0; len7 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred8_0 = ptr7;
        deferred8_1 = len7;
        return getStringFromWasm0(ptr7, len7);
    } finally {
        wasm.__wbindgen_free(deferred8_0, deferred8_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to an SVG with the full `SvgOptions`
 * surface in one call: arbitrary camera, part focus, section cutaway,
 * changed-part highlight, and engineering annotations. This is the superset
 * the MCP `render_view` "agent eyes" path drives; the narrower
 * `render_svg_view*` / `render_svg_annotated` bindings remain for older
 * callers.
 *
 * `view` accepts everything [`render_svg_view`] does, including
 * `"orbit:<azimuth>,<elevation>"` (degrees, Z-up); an unparseable view
 * string is an error here rather than a silent isometric fallback.
 * `focus`, when non-empty, frames the render on that part's bounding box
 * (matched case-insensitively against root node names, assembly instance
 * ids/names, and part-definition ids). `section`, when non-empty, is
 * `"x=N"`/`"y=N"`/`"z=N"` (mm) for a cutaway. `highlight_json` is a JSON
 * string array of part ids/names to spotlight (empty array = none).
 * `axes`/`labels`/`dims` overlay the engineering annotations.
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} view
 * @param {string | null | undefined} focus
 * @param {boolean} axes
 * @param {boolean} labels
 * @param {boolean} dims
 * @param {string | null} [section]
 * @param {string | null} [highlight_json]
 * @returns {string}
 */
export function render_svg_camera(vcad_json, scale, view, focus, axes, labels, dims, section, highlight_json) {
    let deferred11_0;
    let deferred11_1;
    try {
        const val6 = +scale;
        const val7 = +axes;
        const val8 = +labels;
        const val9 = +dims;
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(view, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(focus) ? 0 : passStringToWasm0(focus, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = isLikeNone(section) ? 0 : passStringToWasm0(section, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
            ptr4 = isLikeNone(highlight_json) ? 0 : passStringToWasm0(highlight_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len4 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr4) { wasm.__wbindgen_free(ptr4, len4 * 1, 1); }
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_camera(ptr0, len0, val6, ptr1, len1, ptr2, len2, val7, val8, val9, ptr3, len3, ptr4, len4);
        var ptr10 = ret[0];
        var len10 = ret[1];
        if (ret[3]) {
            ptr10 = 0; len10 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred11_0 = ptr10;
        deferred11_1 = len10;
        return getStringFromWasm0(ptr10, len10);
    } finally {
        wasm.__wbindgen_free(deferred11_0, deferred11_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to an SVG with the full `SvgOptions`
 * surface expressed as one JSON options object — the forward-compatible
 * companion to [`render_svg_camera`] (mirroring [`render_pcb_svg_opts`]),
 * so new render options never need another positional-arg binding.
 *
 * `opts_json` (empty string = defaults):
 * `{"view":"iso","focus":"rotor","axes":false,"labels":false,"dims":false,
 *   "section":"z=10","highlight":["part_3"],"style":"shaded"}`.
 * `view` accepts everything [`render_svg_view`] does, including
 * `"orbit:<azimuth>,<elevation>"`. `style` is `"drafting"` (default, navy
 * tonal family) or `"shaded"` (full material colour). Unknown option keys
 * and unknown style names are errors, never silently ignored.
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} opts_json
 * @returns {string}
 */
export function render_svg_camera_opts(vcad_json, scale, opts_json) {
    let deferred5_0;
    let deferred5_1;
    try {
        const val3 = +scale;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_camera_opts(ptr0, len0, val3, ptr1, len1);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to an SVG from a named orthographic view.
 *
 * `view` accepts `"iso"`/`"isometric"`/`"hero"`, `"top"`, `"front"`,
 * `"side"`, or an arbitrary orbit camera as `"orbit:<azimuth>,<elevation>"`
 * (degrees, Z-up — e.g. `"orbit:35,25"`); anything unrecognized falls back
 * to isometric. Gives agents a flat top-down or elevation look at a part,
 * not just the default 3/4 isometric.
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} view
 * @returns {string}
 */
export function render_svg_view(vcad_json, scale, view) {
    let deferred5_0;
    let deferred5_1;
    try {
        const val3 = +scale;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(view, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_view(ptr0, len0, val3, ptr1, len1);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Render raw `.vcad` document JSON to an SVG with a highlight set — the
 * "what did my edit just touch" render.
 *
 * `highlight_json` is a JSON array of part identifiers (root node ids as
 * reported in a mutation's `changed` diff, node names, or assembly
 * instance ids/names). Highlighted parts keep their full material colour
 * and gain a brand-orange accent outline; every other part is ghosted
 * toward the paper. An empty array renders normally; a non-empty set that
 * matches no part is an error listing the document's parts.
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} view
 * @param {string} highlight_json
 * @returns {string}
 */
export function render_svg_view_highlight(vcad_json, scale, view, highlight_json) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val4 = +scale;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(view, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(highlight_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_view_highlight(ptr0, len0, val4, ptr1, len1, ptr2, len2);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Render a section (cutaway) view: the document cut by an axis-aligned
 * plane, with exposed cut faces cross-hatched drafting-style.
 *
 * `section` is `"x=N"`, `"y=N"`, or `"z=N"` (mm) — the half of the
 * model on the camera's side of the plane is removed. `view` accepts the same names as
 * [`render_svg_view`]; unrecognized values fall back to isometric. A
 * solid whose section boolean fails renders uncut rather than failing
 * the whole render.
 * @param {string} vcad_json
 * @param {number} scale
 * @param {string} view
 * @param {string} section
 * @returns {string}
 */
export function render_svg_view_section(vcad_json, scale, view, section) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val4 = +scale;
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(vcad_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(view, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(section, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.render_svg_view_section(ptr0, len0, val4, ptr1, len1, ptr2, len2);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Resolve a whole document: evaluate parameters, apply bindings onto
 * concrete node fields. Takes the document as a JSON string and returns
 * `{"doc": <resolved document>, "env": {name: number}}` as a JSON string.
 * @param {string} doc_json
 * @returns {string}
 */
export function resolveDocumentJson(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.resolveDocumentJson(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Resolve a `{ name: Parameter }` map (JSON string) into a concrete
 * environment, returned as a JSON string `{ name: number }`.
 * @param {string} params_json
 * @returns {string}
 */
export function resolveParametersJson(params_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.resolveParametersJson(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Sample a document timeline into its full per-frame sequence.
 *
 * `timeline_json` must deserialize into `vcad_ir::animation::Timeline`.
 * Returns a JSON array of `SequenceFrame` objects (params/joints/
 * visibility/explode/camera/geometryDirty per frame) — one call per
 * sequence, so callers never cross the WASM boundary per track or frame.
 * @param {string} timeline_json
 * @returns {string}
 */
export function sample_timeline_sequence(timeline_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(timeline_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sample_timeline_sequence(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Sample a single animation track's value at time `t` seconds.
 *
 * `track_json` must deserialize into `vcad_ir::animation::AnimTrack`.
 * A track with no keys samples to 0.
 * @param {string} track_json
 * @param {number} t
 * @returns {number}
 */
export function sample_timeline_track(track_json, t) {
    const val2 = +t;
    const ptr0 = passStringToWasm0(track_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sample_timeline_track(ptr0, len0, val2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Generate a section view from a triangle mesh.
 *
 * # Arguments
 * * `mesh_js` - Mesh data as JS object with `positions` (Float32Array) and `indices` (Uint32Array)
 * * `plane_json` - JSON string with plane definition: `{"origin": [x,y,z], "normal": [x,y,z], "up": [x,y,z]}`
 * * `hatch_json` - Optional JSON string with hatch pattern: `{"spacing": f64, "angle": f64}`
 *
 * # Returns
 * A JS object containing the section view with curves, hatch lines, and bounds.
 * @param {any} mesh_js
 * @param {string} plane_json
 * @param {string | null} [hatch_json]
 * @returns {any}
 */
export function sectionMesh(mesh_js, plane_json, hatch_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(hatch_json) ? 0 : passStringToWasm0(hatch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.sectionMesh(mesh_js, ptr0, len0, ptr1, len1);
    return ret;
}

/**
 * Folded solid as a STEP file with true cylindrical bend faces.
 * @param {string} chain_json
 * @returns {string}
 */
export function sheetMetalFoldedStep(chain_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(chain_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sheetMetalFoldedStep(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Feasible bend sequence for a chain.
 * @param {string} chain_json
 * @returns {string}
 */
export function sheetMetalSequence(chain_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(chain_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sheetMetalSequence(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Signed analytic radial gap between two part groups' coaxial shaft/bore
 * pair — the fit-mode measurement of a `ClearanceSpec` (press /
 * transition fits). `query_json` is `{label, group_a, group_b,
 * fit_window_mm}`; returns `{gap_mm, parts}` (negative = interference).
 * Errors (no candidate pair, ambiguous pairs, no analytic BRep) are
 * fail-closed: the caller must treat them as unverifiable.
 * @param {string} doc_json
 * @param {string} query_json
 * @returns {any}
 */
export function signedRadialGap(doc_json, query_json) {
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.signedRadialGap(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Extract a ported box from a document and analyze it.
 *
 * `doc_json` is a `vcad_ir::Document`; `selection_json` a
 * `vcad_eval::cavity_extract::CavityExtraction`; `options_json` a
 * `vcad_kernel_acoustics::ported::AnalysisOptions` (`{}` for defaults);
 * `params_json` overrides for the document's parameter values when
 * resolving named spec fields. Fail-closed: unrepresentable geometry errors
 * naming the part and face.
 * @param {string} doc_json
 * @param {string} selection_json
 * @param {string} options_json
 * @param {string} params_json
 * @returns {string}
 */
export function simulateCavity(doc_json, selection_json, options_json, params_json) {
    let deferred6_0;
    let deferred6_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
        try {
            ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(selection_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.simulateCavity(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Steady laminar flow solve (D3Q19 BGK lattice Boltzmann): pressure drop,
 * flow rates, mass audit, optional thermal pickup, and predicted claims.
 * The per-voxel velocity/pressure/temperature fields are only returned
 * when `include_fields` is true — summarize by default, the fields are
 * grid-sized.
 *
 * `spec_json` is a `vcad_kernel_flow::spec::FlowSpec`, `options_json` a
 * `vcad_kernel_flow::solve::SolveOptions` (empty or `{}` for defaults).
 * @param {string} spec_json
 * @param {string} options_json
 * @param {boolean} include_fields
 * @returns {any}
 */
export function simulateFlow(spec_json, options_json, include_fields) {
    const val3 = +include_fields;
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.simulateFlow(ptr0, len0, ptr1, len1, val3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run the mallet-strike pipeline on a flat free-free bar.
 *
 * `input_json` is a [`strike::StrikeInput`]; returns the result JSON with
 * `wav_base64` populated when `include_wav` was set.
 * @param {string} input_json
 * @returns {string}
 */
export function simulateStrikeKernel(input_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(input_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.simulateStrikeKernel(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Build an N-sided polygonal approximation of a circle as arc segments.
 * Returns a JSON array of `SketchSegment2D`.
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} segments
 * @returns {string}
 */
export function sketchCircleSegments(cx, cy, radius, segments) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sketchCircleSegments(cx, cy, radius, segments);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Find the segment-index closest to `(x, y)` within `tolerance`. Returns
 * `-1` if no segment is within reach.
 * @param {string} segments_json
 * @param {number} x
 * @param {number} y
 * @param {number} tolerance
 * @returns {number}
 */
export function sketchHitTest(segments_json, x, y, tolerance) {
    const val2 = +x;
    const val3 = +y;
    const val4 = +tolerance;
    const ptr0 = passStringToWasm0(segments_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.sketchHitTest(ptr0, len0, val2, val3, val4);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0];
}

/**
 * Return a plane's `{origin, xDir, yDir, normal}` as JSON. Accepts either a
 * named plane string or a custom-plane object (same shape as
 * [`WasmSketchSession`]'s constructor argument).
 * @param {string} plane_json
 * @returns {string}
 */
export function sketchPlaneBasis(plane_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sketchPlaneBasis(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Intersect a world-space ray with a plane and return the hit in 2D
 * sketch coordinates as `[x, y]` JSON, or the literal string `"null"` when
 * the ray is parallel to the plane.
 * @param {string} plane_json
 * @param {number} ox
 * @param {number} oy
 * @param {number} oz
 * @param {number} dx
 * @param {number} dy
 * @param {number} dz
 * @returns {string}
 */
export function sketchPlaneIntersectRay(plane_json, ox, oy, oz, dx, dy, dz) {
    let deferred9_0;
    let deferred9_1;
    try {
        const val2 = +ox;
        const val3 = +oy;
        const val4 = +oz;
        const val5 = +dx;
        const val6 = +dy;
        const val7 = +dz;
        const ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sketchPlaneIntersectRay(ptr0, len0, val2, val3, val4, val5, val6, val7);
        var ptr8 = ret[0];
        var len8 = ret[1];
        if (ret[3]) {
            ptr8 = 0; len8 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred9_0 = ptr8;
        deferred9_1 = len8;
        return getStringFromWasm0(ptr8, len8);
    } finally {
        wasm.__wbindgen_free(deferred9_0, deferred9_1, 1);
    }
}

/**
 * Build the four line segments of an axis-aligned rectangle between two
 * opposite corners. Returns a JSON array of `SketchSegment2D`.
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @returns {string}
 */
export function sketchRectangleSegments(p1x, p1y, p2x, p2y) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sketchRectangleSegments(p1x, p1y, p2x, p2y);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Snap a 2D point against a segment list with grid + vertex rules. Returns
 * `{x, y, snapTarget}` JSON — the snapped position plus (if a vertex snap
 * fired) the vertex that was matched.
 * @param {string} segments_json
 * @param {number} x
 * @param {number} y
 * @param {boolean} grid_enabled
 * @param {number} grid_size
 * @param {boolean} point_enabled
 * @param {number} point_tolerance
 * @returns {string}
 */
export function sketchSnap(segments_json, x, y, grid_enabled, grid_size, point_enabled, point_tolerance) {
    let deferred9_0;
    let deferred9_1;
    try {
        const val2 = +x;
        const val3 = +y;
        const val4 = +grid_enabled;
        const val5 = +grid_size;
        const val6 = +point_enabled;
        const val7 = +point_tolerance;
        const ptr0 = passStringToWasm0(segments_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sketchSnap(ptr0, len0, val2, val3, val4, val5, val6, val7);
        var ptr8 = ret[0];
        var len8 = ret[1];
        if (ret[3]) {
            ptr8 = 0; len8 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred9_0 = ptr8;
        deferred9_1 = len8;
        return getStringFromWasm0(ptr8, len8);
    } finally {
        wasm.__wbindgen_free(deferred9_0, deferred9_1, 1);
    }
}

/**
 * Convert 2D sketch coordinates to a 3D world-space point, returning
 * `[x, y, z]` JSON.
 * @param {string} plane_json
 * @param {number} sx
 * @param {number} sy
 * @returns {string}
 */
export function sketchToWorld(plane_json, sx, sy) {
    let deferred5_0;
    let deferred5_1;
    try {
        const val2 = +sx;
        const val3 = +sy;
        const ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sketchToWorld(ptr0, len0, val2, val3);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Project a 3D world-space point onto a plane, returning 2D sketch
 * coordinates as `[x, y]` JSON.
 * @param {string} plane_json
 * @param {number} wx
 * @param {number} wy
 * @param {number} wz
 * @returns {string}
 */
export function sketchWorldToSketch(plane_json, wx, wy, wz) {
    let deferred6_0;
    let deferred6_1;
    try {
        const val2 = +wx;
        const val3 = +wy;
        const val4 = +wz;
        const ptr0 = passStringToWasm0(plane_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sketchWorldToSketch(ptr0, len0, val2, val3, val4);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Slice a mesh from vertices and indices.
 * @param {Float32Array | number[]} vertices
 * @param {Uint32Array | number[]} indices
 * @param {SlicerSettings} settings
 * @returns {SliceResult}
 */
export function sliceMesh(vertices, indices, settings) {
    _assertClass(settings, SlicerSettings);
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.sliceMesh(ptr0, len0, ptr1, len1, settings.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return SliceResult.__wrap(ret[0]);
}

/**
 * Slice a mesh and report progress to a JS callback.
 *
 * The callback is invoked synchronously during the WASM call as
 * `cb(stageLabel: string, current: number, total: number)`. Inside a
 * dedicated worker, the callback can safely `postMessage` to the main
 * thread — the worker thread is the one running the WASM, not the
 * main thread.
 * @param {Float32Array | number[]} vertices
 * @param {Uint32Array | number[]} indices
 * @param {SlicerSettings} settings
 * @param {Function} progress_cb
 * @returns {SliceResult}
 */
export function sliceMeshWithProgress(vertices, indices, settings, progress_cb) {
    _assertClass(settings, SlicerSettings);
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.sliceMeshWithProgress(ptr0, len0, ptr1, len1, settings.__wbg_ptr, progress_cb);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return SliceResult.__wrap(ret[0]);
}

/**
 * Slice a solid.
 * @param {Solid} solid
 * @param {SlicerSettings} settings
 * @param {number | null} [segments]
 * @returns {SliceResult}
 */
export function sliceSolid(solid, settings, segments) {
    _assertClass(solid, Solid);
    _assertClass(settings, SlicerSettings);
    const ret = wasm.sliceSolid(solid.__wbg_ptr, settings.__wbg_ptr, isLikeNone(segments) ? Number.MAX_SAFE_INTEGER : (segments) >>> 0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return SliceResult.__wrap(ret[0]);
}

/**
 * Solve the document's design constraints and return
 * `{ document, report }` — the updated document (footprint positions and
 * rotations, outline vertices, sketch points, back-annotated driven
 * dimensions) plus the solve report (per-group status, DOF, moved
 * geometry, errors).
 * @param {string} doc_json
 * @param {string} options_json
 * @returns {string}
 */
export function solveDesignConstraints(doc_json, options_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solveDesignConstraints(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Solve forward kinematics for an assembly document.
 *
 * # Arguments
 *
 * * `doc_json` - A JSON string representing a vcad Document
 *
 * # Returns
 *
 * A JsValue containing a Map of instance_id -> Transform3D.
 * @param {string} doc_json
 * @returns {any}
 */
export function solveForwardKinematics(doc_json) {
    const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.solveForwardKinematics(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Solve a TS-shaped sketch in one call.
 *
 * Takes a JSON array of `SketchSegment2D` and a JSON array of
 * `SketchConstraint`, runs the Levenberg-Marquardt solver, and returns a
 * JSON object `{ segments, converged }` where `segments` is the solved
 * segment list in the same order as the input. Segments that don't belong
 * to the constraint system (e.g. circle-as-arcs that live purely for
 * rendering) pass through unchanged.
 * @param {string} segments_json
 * @param {string} constraints_json
 * @returns {string}
 */
export function solveSketchSegments(segments_json, constraints_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(segments_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(constraints_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.solveSketchSegments(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Document for a B-rep STEP import: one lazy `step_import` node per solid
 * of the file registered under `path` (`vcad_eval::step_doc`). Returns the
 * document JSON.
 * @param {string} path
 * @param {Uint32Array | number[]} solid_indices
 * @param {string} part_name
 * @param {string} material
 * @returns {string}
 */
export function stepImportDocument(path, solid_indices, part_name, material) {
    let deferred6_0;
    let deferred6_1;
    try {
        let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
        try {
            ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArray32ToWasm0(solid_indices, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = passStringToWasm0(part_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
            ptr3 = passStringToWasm0(material, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len3 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.stepImportDocument(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Whether STEP contents are registered under `path`.
 * @param {string} path
 * @returns {boolean}
 */
export function stepSourceRegistered(path) {
    const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.stepSourceRegistered(ptr0, len0);
    return ret !== 0;
}

/**
 * Get the bounding box of rendered text.
 *
 * Returns the width and height of the text in mm without creating geometry.
 * Useful for layout calculations before extruding text.
 *
 * # Arguments
 *
 * * `text` - The text string to measure
 * * `height` - Text height in mm
 * * `font` - Font name (currently only "sans-serif" supported)
 * * `letter_spacing` - Letter spacing multiplier (1.0 = normal)
 * * `line_spacing` - Line spacing multiplier (1.0 = normal)
 * @param {string} text
 * @param {number} height
 * @param {string | null} [font]
 * @param {number | null} [letter_spacing]
 * @param {number | null} [line_spacing]
 * @returns {any}
 */
export function textBounds(text, height, font, letter_spacing, line_spacing) {
    const val3 = +height;
    const val4 = +(isLikeNone(letter_spacing) ? 0 : letter_spacing);
    const val5 = +(isLikeNone(line_spacing) ? 0 : line_spacing);
    let ptr0, len0, ptr1, len1;
    try {
        ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(font) ? 0 : passStringToWasm0(font, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.textBounds(ptr0, len0, val3, ptr1, len1, !isLikeNone(letter_spacing), val4, !isLikeNone(line_spacing), val5);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Steady heat-conduction solve on a voxel grid: temperature summary,
 * per-source T_max and theta (junction-to-ambient), energy balance, and
 * predicted claims. The full temperature field is not returned (use the
 * claims + summaries; fields are grid-sized).
 *
 * `spec_json` is a `vcad_kernel_thermal::spec::ThermalSpec` (named
 * parameters allowed), `params_json` a `{name: value}` map binding them,
 * `options_json` a `ThermalOptions`.
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function thermalSolve(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.thermalSolve(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Steady thermal solve of a document's own parts.
 *
 * `doc_json` is a `vcad_ir::Document`. The study is `study_json` (a
 * `vcad_ir::ThermalStudy`) when non-empty, else the document's thermal
 * analysis study `study_id` (or its only one). The selected parts are
 * voxelized (`vcad_eval::thermal_extract`), the spec resolved against the
 * document's parameters overlaid with `params_json`, and solved. Returns
 * the `thermalSolve` summary plus `extracted` (grid, per-part voxel
 * audit, sources/sinks as solved) — not the per-voxel index field.
 * @param {string} doc_json
 * @param {string} study_json
 * @param {string} study_id
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function thermalSolveDocument(doc_json, study_json, study_id, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4;
    try {
        ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(study_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(study_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len3 = WASM_VECTOR_LEN;
        ptr4 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len4 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr4) { wasm.__wbindgen_free(ptr4, len4 * 1, 1); }
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.thermalSolveDocument(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Transient heat-conduction solve: backward-Euler time stepping over a
 * piecewise-constant drive schedule (RTP ramp/soak/cool, ambient steps,
 * duty cycles). Returns the T_max and per-source time series plus the
 * final-state summary and the integrated energy audit — full field
 * snapshots are not returned over this seam.
 *
 * `spec_json` is a `ThermalSpec` (every material needs
 * `heat_capacity_j_m3k`), `transient_json` a
 * `vcad_kernel_thermal::spec::TransientSpec`, `params_json` a
 * `{name: value}` map, `options_json` a `ThermalOptions`.
 * @param {string} spec_json
 * @param {string} transient_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function thermalSolveTransient(spec_json, transient_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(transient_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
        ptr3 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len3 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr3) { wasm.__wbindgen_free(ptr3, len3 * 1, 1); }
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.thermalSolveTransient(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Convert a vcad IR Document (JSON) to VCode text format.
 *
 * # Arguments
 * * `doc_json` - JSON string representing a vcad IR Document
 *
 * # Returns
 * The VCode text representation.
 *
 * # Example
 * ```javascript
 * const compact = toVCode(docJson);
 * console.log(compact); // "C 50 30 5\nY 5 10\n..."
 * ```
 * @param {string} doc_json
 * @returns {string}
 */
export function toVCode(doc_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(doc_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.toVCode(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Tolerance stackup analysis: worst-case, RSS, and seeded Monte Carlo over
 * a linear assembly chain, plus exact sensitivities and predicted claims.
 *
 * `spec_json` is a `vcad_kernel_tolerance::spec::StackupSpec` (named
 * parameters allowed), `params_json` a `{name: value}` map binding them
 * (fail-closed: unbound names error), `options_json` a
 * `ToleranceOptions`. Returns all three analyses +
 * `vcad.tolerance-claims/1` + unified-receipt claims (basis `predicted`).
 * @param {string} spec_json
 * @param {string} params_json
 * @param {string} options_json
 * @returns {any}
 */
export function toleranceAnalyze(spec_json, params_json, options_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passStringToWasm0(params_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(options_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.toleranceAnalyze(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * SIMP topology optimization over a box design domain.
 *
 * `spec_json` is a serialized `vcad_kernel_topopt::TopoOptSpec` (loads,
 * supports, volume fraction, resolution, ...). Returns a
 * `WasmTopoOptResult`.
 * @param {string} spec_json
 * @param {number} min_x
 * @param {number} min_y
 * @param {number} min_z
 * @param {number} max_x
 * @param {number} max_y
 * @param {number} max_z
 * @returns {any}
 */
export function topologyOptimizeBox(spec_json, min_x, min_y, min_z, max_x, max_y, max_z) {
    const val2 = +min_x;
    const val3 = +min_y;
    const val4 = +min_z;
    const val5 = +max_x;
    const val6 = +max_y;
    const val7 = +max_z;
    const ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.topologyOptimizeBox(ptr0, len0, val2, val3, val4, val5, val6, val7);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * SIMP topology optimization inside an existing (closed) evaluated mesh:
 * the mesh's interior becomes the design domain, so material only appears
 * where the original part had volume.
 * @param {string} spec_json
 * @param {Float32Array | number[]} positions
 * @param {Uint32Array | number[]} indices
 * @returns {any}
 */
export function topologyOptimizeMesh(spec_json, positions, indices) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passStringToWasm0(spec_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 4, 4); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
        throw e;
    }
    const ret = wasm.topologyOptimizeMesh(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Apply a placement (`scale → rotate → translate`, rotation in degrees) to
 * flat mesh buffers — the engine `transformMesh` contract.
 *
 * `transform_json` is `{ translate: {x,y,z}, rotate: {x,y,z}, scale: {x,y,z},
 * rotateOrder? }`. Rotation is Rz·Ry·Rx (`Transform3D`) by default;
 * `rotateOrder: "xyz"` means raw `CsgOp::Rotate` angles, Rx·Ry·Rz.
 * Positions get the full placement; normals (optional) get the rotation
 * only. Returns `{ positions, normals? }`.
 * @param {Float32Array | number[]} positions
 * @param {Float32Array | number[] | null | undefined} normals
 * @param {string} transform_json
 * @returns {any}
 */
export function transformMeshBuffers(positions, normals, transform_json) {
    let ptr0, len0, ptr1, len1, ptr2, len2;
    try {
        ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        len0 = WASM_VECTOR_LEN;
        ptr1 = isLikeNone(normals) ? 0 : passArrayF32ToWasm0(normals, wasm.__wbindgen_malloc);
        len1 = WASM_VECTOR_LEN;
        ptr2 = passStringToWasm0(transform_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        len2 = WASM_VECTOR_LEN;
    } catch (e) {
        if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
        if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
        if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
        throw e;
    }
    const ret = wasm.transformMeshBuffers(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Forget the STEP contents registered under `path`.
 * @param {string} path
 */
export function unregisterStepSource(path) {
    const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.unregisterStepSource(ptr0, len0);
}

/**
 * Report the name of a floating joint found inside a **commented-out**
 * region of the URDF, or `undefined` if there is none.
 *
 * A hit is a strong signal the caller wants `floating_base` — the file's
 * author wrote the joint and then commented it out for the simulator to
 * supply.
 * @param {Uint8Array | number[]} data
 * @returns {string | undefined}
 */
export function urdfCommentedFloatingJoint(data) {
    const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.urdfCommentedFloatingJoint(ptr0, len0);
    let v2;
    if (ret[0] !== 0) {
        v2 = getStringFromWasm0(ret[0], ret[1]);
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    }
    return v2;
}

/**
 * Write a DST file from an embroidery pattern JSON string.
 * @param {string} json
 * @returns {Uint8Array}
 */
export function writeEmbroideryDst(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writeEmbroideryDst(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * Write a PES file from an embroidery pattern JSON string.
 * @param {string} json
 * @returns {Uint8Array}
 */
export function writeEmbroideryPes(json) {
    const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writeEmbroideryPes(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_208446807d0d1e30: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_ff192a72a0dcdf6d: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_Window_41838cbcc08822b5: function(arg0) {
            const ret = arg0.Window;
            return ret;
        },
        __wbg_WorkerGlobalScope_448e3830f27a30fd: function(arg0) {
            const ret = arg0.WorkerGlobalScope;
            return ret;
        },
        __wbg___wbindgen_bigint_get_as_i64_11da4b52cd0aedef: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64((arg0 >>> 0) + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_4f1baf9a00be3c74: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_f249a2a76caa9a55: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_3f58a9d3b3a7eed2: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_5fa10641e039d3ef: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_741ff2bb612836f5: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_c22311b1cc228e3a: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_8b968c3ab8e96595: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_fc456fee5d3317de: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_be5b34249ff1fc15: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_38d7bfbe4cc84039: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_b2f214e2e4b30e36: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_module_2e98e71e8e96b4ac: function() {
            const ret = wasmModule;
            return ret;
        },
        __wbg___wbindgen_number_get_934b640d0889af78: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64((arg0 >>> 0) + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_7ce8eee7fd327545: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_09736879a3f67559: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_activeTexture_45b425a49df733ce: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_activeTexture_89cef8c297ad0698: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_attachShader_3ed301cc92db59f6: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_attachShader_817dcec9e79fd18f: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_beginComputePass_b3bb1a69e6a70bde: function(arg0, arg1) {
            const ret = arg0.beginComputePass(arg1);
            return ret;
        },
        __wbg_beginQuery_f800947e639433e8: function(arg0, arg1, arg2) {
            arg0.beginQuery(arg1 >>> 0, arg2);
        },
        __wbg_bindAttribLocation_40c41e6185822b52: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
        },
        __wbg_bindAttribLocation_b51bf2d65ded8f70: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
        },
        __wbg_bindBufferRange_da5accbcd5d223ad: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
        },
        __wbg_bindBuffer_b3bb001fdbee089a: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindBuffer_cbc9075f76fffa51: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindFramebuffer_79534f24b57b7b95: function(arg0, arg1, arg2) {
            arg0.bindFramebuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindFramebuffer_b245cd93a150dd96: function(arg0, arg1, arg2) {
            arg0.bindFramebuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindRenderbuffer_3458a69a6dc55057: function(arg0, arg1, arg2) {
            arg0.bindRenderbuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindRenderbuffer_612f27d9b3b97b9f: function(arg0, arg1, arg2) {
            arg0.bindRenderbuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindSampler_0fb033a6ffd5d7b3: function(arg0, arg1, arg2) {
            arg0.bindSampler(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_6f822943b2790466: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_a23350e1b573ddfd: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindVertexArrayOES_5161c1f5b1fea3f9: function(arg0, arg1) {
            arg0.bindVertexArrayOES(arg1);
        },
        __wbg_bindVertexArray_cc64c48bf67ab8d4: function(arg0, arg1) {
            arg0.bindVertexArray(arg1);
        },
        __wbg_blendColor_8631cab46394c93b: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendColor(arg1, arg2, arg3, arg4);
        },
        __wbg_blendColor_957c8ddad53063a2: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendColor(arg1, arg2, arg3, arg4);
        },
        __wbg_blendEquationSeparate_0dceb23863585a87: function(arg0, arg1, arg2) {
            arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendEquationSeparate_156fe040a9aebfd6: function(arg0, arg1, arg2) {
            arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendEquation_847eb360af3b2786: function(arg0, arg1) {
            arg0.blendEquation(arg1 >>> 0);
        },
        __wbg_blendEquation_cd72c0ac181cd88d: function(arg0, arg1) {
            arg0.blendEquation(arg1 >>> 0);
        },
        __wbg_blendFuncSeparate_6db2212299fd7f1e: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_blendFuncSeparate_eb9098d760f4a25c: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_blendFunc_378a3be8ab6cb7d0: function(arg0, arg1, arg2) {
            arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendFunc_68b4cfb9bd98a13f: function(arg0, arg1, arg2) {
            arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blitFramebuffer_d17b7bddf5e86dbc: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
        },
        __wbg_bufferData_2fb8740d60478bf0: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_41b591a9f2d502ad: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_9305dba3ba9cba4e: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_9eb9c4c5053ac480: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferSubData_8acfdcd4b9f7edeb: function(arg0, arg1, arg2, arg3) {
            arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
        },
        __wbg_bufferSubData_9bec93d67e98757e: function(arg0, arg1, arg2, arg3) {
            arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
        },
        __wbg_call_275b78b3b6520b92: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.call(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_call_40b008ba32f73991: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_a410eb4b59ed5965: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_clearBufferfv_474b28c18db287a8: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_clearBufferiv_a89cfdf7da6f2819: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
        },
        __wbg_clearBufferuiv_e723936f302725de: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
        },
        __wbg_clearDepth_3417be30229e823a: function(arg0, arg1) {
            arg0.clearDepth(arg1);
        },
        __wbg_clearDepth_3dc1f52f96f29526: function(arg0, arg1) {
            arg0.clearDepth(arg1);
        },
        __wbg_clearStencil_29f687031586f5e6: function(arg0, arg1) {
            arg0.clearStencil(arg1);
        },
        __wbg_clearStencil_59a8a925116b24ec: function(arg0, arg1) {
            arg0.clearStencil(arg1);
        },
        __wbg_clear_3ffa1ed794f92a04: function(arg0, arg1) {
            arg0.clear(arg1 >>> 0);
        },
        __wbg_clear_ccb3d618da90fea3: function(arg0, arg1) {
            arg0.clear(arg1 >>> 0);
        },
        __wbg_clientWaitSync_fee803cb72073198: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_colorMask_24c1b6c3ec53f8c8: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
        },
        __wbg_colorMask_cfc2d619716d01ed: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
        },
        __wbg_compileShader_11eb6754e9b15970: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_compileShader_54c3771819e6caba: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_compressedTexSubImage2D_8706ea3fb9e0180c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
        },
        __wbg_compressedTexSubImage2D_b6a8807f715c2782: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
        },
        __wbg_compressedTexSubImage2D_d66b16b23793038b: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
        },
        __wbg_compressedTexSubImage3D_74b7bfbc9a7fc90f: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
        },
        __wbg_compressedTexSubImage3D_e1d361485803b713: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
        },
        __wbg_configure_2f4cbe7746e5aa81: function() { return handleError(function (arg0, arg1) {
            arg0.configure(arg1);
        }, arguments); },
        __wbg_copyBufferSubData_b10635982222cbc4: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
        },
        __wbg_copyBufferToBuffer_2c8a5726f948b97e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_copyBufferToBuffer_d8141ff7d5df2685: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_copyTexSubImage2D_0cc80bc35bca1d8e: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        },
        __wbg_copyTexSubImage2D_be50078e0f0575f1: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        },
        __wbg_copyTexSubImage3D_e35f615c7c8244ba: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
        },
        __wbg_copyTextureToBuffer_7594e30771291dba: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_createBindGroupLayout_03a20e72b41b406e: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBindGroupLayout(arg1);
            return ret;
        }, arguments); },
        __wbg_createBindGroup_ec4dc4d9e46e1104: function(arg0, arg1) {
            const ret = arg0.createBindGroup(arg1);
            return ret;
        },
        __wbg_createBuffer_2c27ad5f899d418d: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createBuffer_baa81dab839b6c5c: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBuffer(arg1);
            return ret;
        }, arguments); },
        __wbg_createBuffer_ca6ca40e9fb13678: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createCommandEncoder_a5136f45baaba888: function(arg0, arg1) {
            const ret = arg0.createCommandEncoder(arg1);
            return ret;
        },
        __wbg_createComputePipeline_6a05383609fddac6: function(arg0, arg1) {
            const ret = arg0.createComputePipeline(arg1);
            return ret;
        },
        __wbg_createFramebuffer_cdf686778c61014d: function(arg0) {
            const ret = arg0.createFramebuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createFramebuffer_f52399034cb1a200: function(arg0) {
            const ret = arg0.createFramebuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createPipelineLayout_a955ff1e35a63634: function(arg0, arg1) {
            const ret = arg0.createPipelineLayout(arg1);
            return ret;
        },
        __wbg_createProgram_de0881c688a8e43b: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createProgram_ea784724f6f0074f: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createQuery_8f0481bdf42276b8: function(arg0) {
            const ret = arg0.createQuery();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createRenderbuffer_19c2eec619a37a15: function(arg0) {
            const ret = arg0.createRenderbuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createRenderbuffer_e45c14c918a72668: function(arg0) {
            const ret = arg0.createRenderbuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createSampler_5bc030b64ed02c52: function(arg0) {
            const ret = arg0.createSampler();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createShaderModule_f540847678b68e08: function(arg0, arg1) {
            const ret = arg0.createShaderModule(arg1);
            return ret;
        },
        __wbg_createShader_9754a1e4ef374e84: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createShader_d2d90020273cef2b: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_3287f26407473071: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_5e2361f396945928: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createTexture(arg1);
            return ret;
        }, arguments); },
        __wbg_createTexture_eec9a1994aabeca7: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArrayOES_3eaf087ef22da1cb: function(arg0) {
            const ret = arg0.createVertexArrayOES();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArray_1293d2ffa8346be2: function(arg0) {
            const ret = arg0.createVertexArray();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createView_e495f88700d28104: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createView(arg1);
            return ret;
        }, arguments); },
        __wbg_cullFace_208151a46885a1fa: function(arg0, arg1) {
            arg0.cullFace(arg1 >>> 0);
        },
        __wbg_cullFace_9eaca57652d7ed37: function(arg0, arg1) {
            arg0.cullFace(arg1 >>> 0);
        },
        __wbg_deleteBuffer_673584ba5a55669d: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteBuffer_ffa760fd3b0b5ef1: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteFramebuffer_0ec884f89db72a3e: function(arg0, arg1) {
            arg0.deleteFramebuffer(arg1);
        },
        __wbg_deleteFramebuffer_ffdb1bee4c92ae4c: function(arg0, arg1) {
            arg0.deleteFramebuffer(arg1);
        },
        __wbg_deleteProgram_8c38fff0f4a88dea: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteProgram_c07d952a1b0c1cb6: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteQuery_dfd665f6d8652e22: function(arg0, arg1) {
            arg0.deleteQuery(arg1);
        },
        __wbg_deleteRenderbuffer_3a6e1676ab926e0f: function(arg0, arg1) {
            arg0.deleteRenderbuffer(arg1);
        },
        __wbg_deleteRenderbuffer_895ff607251243a9: function(arg0, arg1) {
            arg0.deleteRenderbuffer(arg1);
        },
        __wbg_deleteSampler_2b73428131e403e1: function(arg0, arg1) {
            arg0.deleteSampler(arg1);
        },
        __wbg_deleteShader_320530dd636bc187: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteShader_ac74568b64a1c3c7: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteSync_eede535e5826f144: function(arg0, arg1) {
            arg0.deleteSync(arg1);
        },
        __wbg_deleteTexture_1653a9994a44215e: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deleteTexture_89bd1d49ae4fb309: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deleteVertexArrayOES_2214ecdf65be031d: function(arg0, arg1) {
            arg0.deleteVertexArrayOES(arg1);
        },
        __wbg_deleteVertexArray_2589b74b67ba20c8: function(arg0, arg1) {
            arg0.deleteVertexArray(arg1);
        },
        __wbg_depthFunc_04abd9f6ff980ba9: function(arg0, arg1) {
            arg0.depthFunc(arg1 >>> 0);
        },
        __wbg_depthFunc_584bfa0174e7628a: function(arg0, arg1) {
            arg0.depthFunc(arg1 >>> 0);
        },
        __wbg_depthMask_276856a569045897: function(arg0, arg1) {
            arg0.depthMask(arg1 !== 0);
        },
        __wbg_depthMask_2ba7e83178c3cec3: function(arg0, arg1) {
            arg0.depthMask(arg1 !== 0);
        },
        __wbg_depthRange_8b4b69a7c91ff92b: function(arg0, arg1, arg2) {
            arg0.depthRange(arg1, arg2);
        },
        __wbg_depthRange_942825e3232596de: function(arg0, arg1, arg2) {
            arg0.depthRange(arg1, arg2);
        },
        __wbg_destroy_6e289142e39fe18b: function(arg0) {
            arg0.destroy();
        },
        __wbg_disableVertexAttribArray_011898581287ef1e: function(arg0, arg1) {
            arg0.disableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_disableVertexAttribArray_5c66375eba552ee7: function(arg0, arg1) {
            arg0.disableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_disable_2ead6c11cefd0322: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_disable_8a9e81e6d64d046b: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_dispatchWorkgroups_74a6ec8812ef9f3b: function(arg0, arg1, arg2, arg3) {
            arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_document_3b5c3071b43e97ee: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_57e08d0be6e30c02: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_drawArraysInstancedANGLE_635e10224985b842: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
        },
        __wbg_drawArraysInstanced_762b36f2147c7a85: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
        },
        __wbg_drawArrays_a9c18db2e94f4a82: function(arg0, arg1, arg2, arg3) {
            arg0.drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawArrays_fe5a51410bfabb5b: function(arg0, arg1, arg2, arg3) {
            arg0.drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawBuffersWEBGL_49c672d0ddcdfe71: function(arg0, arg1) {
            arg0.drawBuffersWEBGL(arg1);
        },
        __wbg_drawBuffers_e296659ce384e721: function(arg0, arg1) {
            arg0.drawBuffers(arg1);
        },
        __wbg_drawElementsInstancedANGLE_470ce8b489eeafa5: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_drawElementsInstanced_3240c0c168d6af87: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_enableVertexAttribArray_d485706ade6bebf8: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enableVertexAttribArray_eeecc6185af24227: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enable_c3c00565c89d3175: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_enable_e955d456ef6b93f7: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_endQuery_f052a8f0f3589d3b: function(arg0, arg1) {
            arg0.endQuery(arg1 >>> 0);
        },
        __wbg_end_23ba48463344fbc0: function(arg0) {
            arg0.end();
        },
        __wbg_entries_7bb1459bd9b5c2b9: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_error_2fa67a9496f77475: function(arg0) {
            const ret = arg0.error;
            return ret;
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_d1fc0193610e0e39: function(arg0) {
            console.error(arg0);
        },
        __wbg_fenceSync_53f6f24f4bb43d24: function(arg0, arg1, arg2) {
            const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_finish_49529a046631ad9a: function(arg0) {
            const ret = arg0.finish();
            return ret;
        },
        __wbg_finish_678df663961386ff: function(arg0, arg1) {
            const ret = arg0.finish(arg1);
            return ret;
        },
        __wbg_finish_783de9bff3b56540: function(arg0) {
            arg0.finish();
        },
        __wbg_finish_abf9726b03095270: function(arg0) {
            arg0.finish();
        },
        __wbg_flush_4911c503a18d091d: function(arg0) {
            arg0.flush();
        },
        __wbg_flush_a9981e0bd1a44897: function(arg0) {
            arg0.flush();
        },
        __wbg_framebufferRenderbuffer_1c89563506a7d0ac: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_framebufferRenderbuffer_ffaba93222aea77c: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_framebufferTexture2D_2c69ac0ce67faf7d: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
        },
        __wbg_framebufferTexture2D_b6250a0c37eb48c2: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
        },
        __wbg_framebufferTextureLayer_2f6e24e2dbf9b214: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
        },
        __wbg_framebufferTextureMultiviewOVR_63308e847d8b8f6c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
        },
        __wbg_frontFace_124bb11a73cc0dd1: function(arg0, arg1) {
            arg0.frontFace(arg1 >>> 0);
        },
        __wbg_frontFace_8bbd77ca3b8f90a6: function(arg0, arg1) {
            arg0.frontFace(arg1 >>> 0);
        },
        __wbg_getBufferSubData_4a9f8244f0e59e63: function(arg0, arg1, arg2, arg3) {
            arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
        },
        __wbg_getContext_1938edb9a972f63d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_9d32151c28a36ed6: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_f2ea37484e3f8ff4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getExtension_30c10f49f67eb05d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getIndexedParameter_5d1c39ef8e171053: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_fd3092e276caa831: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_getParameter_4c67158a3cef7a34: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getParameter_7fbe79a0114e119f: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getProgramInfoLog_01799fd7b07b7f3c: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getProgramInfoLog_92d61551e1ab39ea: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getProgramParameter_1e7562e7d66170c3: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getProgramParameter_3edd526f9e5f6c10: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getQueryParameter_0beb5dc153d8ca4f: function(arg0, arg1, arg2) {
            const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getRandomValues_01076ebaa66264dc: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getShaderInfoLog_3cfe5b3e097d0f2d: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getShaderInfoLog_8758e8aea7960121: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getShaderParameter_a346f74d5ba41c4b: function(arg0, arg1, arg2) {
            const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getShaderParameter_fc64069fbc010d19: function(arg0, arg1, arg2) {
            const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getSupportedExtensions_f48b337512e8f8ce: function(arg0) {
            const ret = arg0.getSupportedExtensions();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getSupportedProfiles_b5cc35261935c0c9: function(arg0) {
            const ret = arg0.getSupportedProfiles();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getSyncParameter_8b7b36e9efd95806: function(arg0, arg1, arg2) {
            const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getUniformBlockIndex_0742ae35f926850a: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_getUniformLocation_6352e0669c8f5393: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getUniformLocation_e0d11c86376cdd26: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_2080c49015e35254: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_635eea311fa1a291: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_d7176cfb76d71114: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unchecked_e6325ad374eff861: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_with_ref_key_fc601247060b7204: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_gpu_aa311a9494720027: function(arg0) {
            const ret = arg0.gpu;
            return ret;
        },
        __wbg_includes_40dae55ee37516e5: function(arg0, arg1, arg2) {
            const ret = arg0.includes(arg1, arg2);
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_12cdaa4161423e6b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOutOfMemoryError_72d4f143d9ec20cb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUOutOfMemoryError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuValidationError_cdb716bc3a7ed585: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUValidationError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlCanvasElement_89f280683e987b9e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLCanvasElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Map_0b4fc8b62e73f163: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Map;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_d7aeb0dcb3108fea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebGl2RenderingContext_de6feb460369d6c6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebGL2RenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_5cf453f5639aa1a2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_invalidateFramebuffer_33206c632642a1bd: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
        }, arguments); },
        __wbg_isArray_bcf1376d0d732d08: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isSafeInteger_1a35ba4d31e71d38: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_is_2248ff2b575d60c7: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_iterator_e4c5e8f68ada7b58: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_label_b4e9fa173fb30ad5: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_length_186163212ffe79c3: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_b03a0fabb109b1e9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_limits_7f838192fdb36f0a: function(arg0) {
            const ret = arg0.limits;
            return ret;
        },
        __wbg_linkProgram_99848b73f1ebab5f: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_linkProgram_dee7cda98bacb12f: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_log_ff86bbb34c295e21: function(arg0) {
            console.log(arg0);
        },
        __wbg_mapAsync_84aeaa5780c9b8c7: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
            return ret;
        },
        __wbg_maxBindGroupsPlusVertexBuffers_5a483d2af94e57bc: function(arg0) {
            const ret = arg0.maxBindGroupsPlusVertexBuffers;
            return ret;
        },
        __wbg_maxBindGroups_8280e3693e832071: function(arg0) {
            const ret = arg0.maxBindGroups;
            return ret;
        },
        __wbg_maxBindingsPerBindGroup_872ae44e536b19a5: function(arg0) {
            const ret = arg0.maxBindingsPerBindGroup;
            return ret;
        },
        __wbg_maxBufferSize_9dae4d9428e42f10: function(arg0) {
            const ret = arg0.maxBufferSize;
            return ret;
        },
        __wbg_maxColorAttachmentBytesPerSample_12d8884108587e97: function(arg0) {
            const ret = arg0.maxColorAttachmentBytesPerSample;
            return ret;
        },
        __wbg_maxColorAttachments_deb9217288cb10c6: function(arg0) {
            const ret = arg0.maxColorAttachments;
            return ret;
        },
        __wbg_maxComputeInvocationsPerWorkgroup_c4b13a829ed0b259: function(arg0) {
            const ret = arg0.maxComputeInvocationsPerWorkgroup;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeX_91c35c8e026d4b2e: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeX;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeY_961e4fb0ccb8e424: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeY;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeZ_62c453c3b2746fe1: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeZ;
            return ret;
        },
        __wbg_maxComputeWorkgroupStorageSize_dcf9113c2281aa6c: function(arg0) {
            const ret = arg0.maxComputeWorkgroupStorageSize;
            return ret;
        },
        __wbg_maxComputeWorkgroupsPerDimension_c8e2df553b22565e: function(arg0) {
            const ret = arg0.maxComputeWorkgroupsPerDimension;
            return ret;
        },
        __wbg_maxDynamicStorageBuffersPerPipelineLayout_43810e253385b7f5: function(arg0) {
            const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxDynamicUniformBuffersPerPipelineLayout_e160bf315957a3a1: function(arg0) {
            const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxInterStageShaderVariables_62a6f8974aa80170: function(arg0) {
            const ret = arg0.maxInterStageShaderVariables;
            return ret;
        },
        __wbg_maxSampledTexturesPerShaderStage_45931d0d0e425368: function(arg0) {
            const ret = arg0.maxSampledTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxSamplersPerShaderStage_fd87b1b55a1bce03: function(arg0) {
            const ret = arg0.maxSamplersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageBufferBindingSize_bec702c6fccfd8d5: function(arg0) {
            const ret = arg0.maxStorageBufferBindingSize;
            return ret;
        },
        __wbg_maxStorageBuffersPerShaderStage_36af4d1cf6b73e49: function(arg0) {
            const ret = arg0.maxStorageBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageTexturesPerShaderStage_bf0523882733deac: function(arg0) {
            const ret = arg0.maxStorageTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxTextureArrayLayers_7c675fa8f48e7e97: function(arg0) {
            const ret = arg0.maxTextureArrayLayers;
            return ret;
        },
        __wbg_maxTextureDimension1D_bb69683afe97bf80: function(arg0) {
            const ret = arg0.maxTextureDimension1D;
            return ret;
        },
        __wbg_maxTextureDimension2D_cee54c433bf3b9c1: function(arg0) {
            const ret = arg0.maxTextureDimension2D;
            return ret;
        },
        __wbg_maxTextureDimension3D_ae26b58b1450c99a: function(arg0) {
            const ret = arg0.maxTextureDimension3D;
            return ret;
        },
        __wbg_maxUniformBufferBindingSize_00f780f64f0dd7c4: function(arg0) {
            const ret = arg0.maxUniformBufferBindingSize;
            return ret;
        },
        __wbg_maxUniformBuffersPerShaderStage_2c2054e9d96df7ad: function(arg0) {
            const ret = arg0.maxUniformBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxVertexAttributes_425aa710b80da882: function(arg0) {
            const ret = arg0.maxVertexAttributes;
            return ret;
        },
        __wbg_maxVertexBufferArrayStride_8f0c56e46eba7c97: function(arg0) {
            const ret = arg0.maxVertexBufferArrayStride;
            return ret;
        },
        __wbg_maxVertexBuffers_473f2615aa5963dd: function(arg0) {
            const ret = arg0.maxVertexBuffers;
            return ret;
        },
        __wbg_message_bb4d389df9355dd2: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_minStorageBufferOffsetAlignment_f9ce2fe03a21a2e4: function(arg0) {
            const ret = arg0.minStorageBufferOffsetAlignment;
            return ret;
        },
        __wbg_minUniformBufferOffsetAlignment_bca4b75f696bbf11: function(arg0) {
            const ret = arg0.minUniformBufferOffsetAlignment;
            return ret;
        },
        __wbg_navigator_9641ab32fa612dd1: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_navigator_c17f443a6fe5d38d: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_new_13de428334042d26: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_2bfd0f45e60518b1: function() { return handleError(function (arg0, arg1) {
            const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_37eb45aaf5eeb820: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_7075786089b89c5e: function() {
            const ret = new Map();
            return ret;
        },
        __wbg_new_ba40181b3f24ac80: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_bb74001155cb8ca8: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_cd4348290afae586: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_from_slice_3512352010266e02: function(arg0, arg1) {
            const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_355c10c5d8f2addb: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_b8daf545a41c6aa0: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_6b60b99917da27d6: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_typed_e09da9dae6ee5935: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_3cd32055a417f095: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_length_a3dc62dea6e2e158: function(arg0) {
            const ret = new Array(arg0 >>> 0);
            return ret;
        },
        __wbg_next_178c1651c11432b3: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_af5ac6a08bb0a717: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_now_463ac581d2fc7ea3: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_7ea0b064671ccb66: function() {
            const ret = performance.now();
            return ret;
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_of_027eb15371aac932: function(arg0) {
            const ret = Array.of(arg0);
            return ret;
        },
        __wbg_onSubmittedWorkDone_f62945abb48d8a84: function(arg0) {
            const ret = arg0.onSubmittedWorkDone();
            return ret;
        },
        __wbg_performance_7e4e4494fdc9d07a: function(arg0) {
            const ret = arg0.performance;
            return ret;
        },
        __wbg_pixelStorei_43dc7945a0d4d49c: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_pixelStorei_6dd56b4da047c480: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_polygonOffset_41bc1f487e5f53fe: function(arg0, arg1, arg2) {
            arg0.polygonOffset(arg1, arg2);
        },
        __wbg_polygonOffset_acf166e60739dbfa: function(arg0, arg1, arg2) {
            arg0.polygonOffset(arg1, arg2);
        },
        __wbg_prototypesetcall_13162965d1fe7aa3: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_c9f4893fc209f768: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_queryCounterEXT_d43bae4582de7efd: function(arg0, arg1, arg2) {
            arg0.queryCounterEXT(arg1, arg2 >>> 0);
        },
        __wbg_querySelector_72201b7c62dc196b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_queueMicrotask_1e8503a8a690f0a3: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_4a1a4d8dd332373b: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queue_41b76331de876d9d: function(arg0) {
            const ret = arg0.queue;
            return ret;
        },
        __wbg_readBuffer_49d4b278b9838d40: function(arg0, arg1) {
            arg0.readBuffer(arg1 >>> 0);
        },
        __wbg_readPixels_22316d250d820aff: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_56a96c4d106afcbc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_7c7b54a733248182: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_renderbufferStorageMultisample_d5b01825cc08514b: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_renderbufferStorage_0d080ee86520d3bd: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_renderbufferStorage_ebe429f577dae949: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_requestAdapter_b725cba92e32c4ce: function(arg0, arg1) {
            const ret = arg0.requestAdapter(arg1);
            return ret;
        },
        __wbg_requestDevice_45bc1149c3b98eaf: function(arg0, arg1) {
            const ret = arg0.requestDevice(arg1);
            return ret;
        },
        __wbg_resolve_dbf78ab4942478b0: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_samplerParameterf_1fb6c6796e22f10f: function(arg0, arg1, arg2, arg3) {
            arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
        },
        __wbg_samplerParameteri_defcb3b230e696e7: function(arg0, arg1, arg2, arg3) {
            arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
        },
        __wbg_scissor_17956d9d23dfe025: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_scissor_bb7201f050f220ac: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_setBindGroup_09aa10258bd4dc11: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setBindGroup_0e4a7b8b254673b9: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setPipeline_1368374122476dc8: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_set_118fefd528ab0a79: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_2793479888329cb6: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_8282f7e0d2d01336: function(arg0, arg1, arg2) {
            const ret = arg0.set(arg1, arg2);
            return ret;
        },
        __wbg_set_access_46b3e62b6a30d608: function(arg0, arg1) {
            arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
        },
        __wbg_set_array_layer_count_f652f75c2d85d00b: function(arg0, arg1) {
            arg0.arrayLayerCount = arg1 >>> 0;
        },
        __wbg_set_aspect_0820f36ab69e69c7: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_4eaf6e4f871485aa: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_base_array_layer_766baefe617e7450: function(arg0, arg1) {
            arg0.baseArrayLayer = arg1 >>> 0;
        },
        __wbg_set_base_mip_level_6c4e57453fe07edf: function(arg0, arg1) {
            arg0.baseMipLevel = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_bda54c444871cf36: function(arg0, arg1) {
            arg0.beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_bind_group_layouts_78efad321b8db306: function(arg0, arg1, arg2) {
            arg0.bindGroupLayouts = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_binding_49121810d92bb656: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_binding_921af47b178839b7: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_buffer_3eb765d2630ec17e: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_e254d16772ccdf1f: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_f0412de54dad59a0: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_bytes_per_row_2edc74cba6ac1b69: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_bytes_per_row_5b4cd93af94a0d4b: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_code_71b4a924b594417d: function(arg0, arg1, arg2) {
            arg0.code = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_compute_6328b3ac805fa957: function(arg0, arg1) {
            arg0.compute = arg1;
        },
        __wbg_set_d2d33b52458e984a: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_depth_or_array_layers_41d9bf5003084813: function(arg0, arg1) {
            arg0.depthOrArrayLayers = arg1 >>> 0;
        },
        __wbg_set_device_2b7e0e4f69784351: function(arg0, arg1) {
            arg0.device = arg1;
        },
        __wbg_set_dimension_536f245d466cca10: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
        },
        __wbg_set_dimension_91e724d498a35c9a: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_e4b9a833d288759a: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_end_of_pass_write_index_4b0931cfb0c1f44c: function(arg0, arg1) {
            arg0.endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_entries_02ae66da25c9ddae: function(arg0, arg1, arg2) {
            arg0.entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entries_8036374af27741dc: function(arg0, arg1, arg2) {
            arg0.entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_79bb4d8fb01c97ec: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_external_texture_34c43368e77cc844: function(arg0, arg1) {
            arg0.externalTexture = arg1;
        },
        __wbg_set_format_1d70746424721ed1: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_8003fc2174c14359: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_c1603ca98ab9cb13: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_df8baca64e04f5ef: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_has_dynamic_offset_0086bc7faede16d1: function(arg0, arg1) {
            arg0.hasDynamicOffset = arg1 !== 0;
        },
        __wbg_set_height_546367a98b9ab695: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_ae0610d318c3428c: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_ae24c2f7d580ae0a: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_label_1d7c053bc726e08f: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_1e431973068c0ea4: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_2d3e4456ff9a120a: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5e1a79b630ee9fa3: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_89172d31c03b3375: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_a71d5f5c41bed969: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_d133ac18919ae10f: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_dcaa5d479cbb5311: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_dcb16ec336a5420d: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e9f1af9890ad68b6: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_ef8bfd8864e594a4: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_f9171cd5c971dbf2: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_layout_6b757fab7265d0f7: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_bfddc4788acb0736: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_gpu_auto_layout_mode_89827b74212f80b4: function(arg0, arg1) {
            arg0.layout = __wbindgen_enum_GpuAutoLayoutMode[arg1];
        },
        __wbg_set_mapped_at_creation_a4cd55019116b792: function(arg0, arg1) {
            arg0.mappedAtCreation = arg1 !== 0;
        },
        __wbg_set_min_binding_size_f64_2458ad9bffad7ea7: function(arg0, arg1) {
            arg0.minBindingSize = arg1;
        },
        __wbg_set_mip_level_count_19560e4f63320832: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_ef313d3a441aa51e: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_dbdf4ee3ba07c689: function(arg0, arg1) {
            arg0.mipLevel = arg1 >>> 0;
        },
        __wbg_set_module_bffb3e27ccc03d8d: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_multisampled_d385dcc24cbcdac9: function(arg0, arg1) {
            arg0.multisampled = arg1 !== 0;
        },
        __wbg_set_offset_f64_1596700fad993892: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_f64_b1157147188cb175: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_f64_f65aa794a52b87dc: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_onuncapturederror_1a772a1feba5ec1d: function(arg0, arg1) {
            arg0.onuncapturederror = arg1;
        },
        __wbg_set_origin_gpu_origin_3d_dict_c2b5dc3bd3763139: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_power_preference_06107ba643e66249: function(arg0, arg1) {
            arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
        },
        __wbg_set_query_set_a1af7e0b244eb437: function(arg0, arg1) {
            arg0.querySet = arg1;
        },
        __wbg_set_required_features_ef8aeb4d5f909e03: function(arg0, arg1, arg2) {
            arg0.requiredFeatures = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_required_limits_a80a53fd4744ccb2: function(arg0, arg1) {
            arg0.requiredLimits = arg1;
        },
        __wbg_set_resource_d37005b6a3d3375f: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_resource_gpu_buffer_binding_8e9be21bc9a45330: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_resource_gpu_texture_view_e3bf3810e7168d2b: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_rows_per_image_aa7986b60cd7869e: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_rows_per_image_e9f4da51b05f4ee1: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_sample_count_a4d54cf5bcf23914: function(arg0, arg1) {
            arg0.sampleCount = arg1 >>> 0;
        },
        __wbg_set_sample_type_660a4d77497517e2: function(arg0, arg1) {
            arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
        },
        __wbg_set_sampler_35b5b2e68532815b: function(arg0, arg1) {
            arg0.sampler = arg1;
        },
        __wbg_set_size_f64_04b949f2af8176ba: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_f64_2418f77508fb05d7: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_gpu_extent_3d_dict_7180918365da46d5: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_storage_texture_c2ed1f3eb327112e: function(arg0, arg1) {
            arg0.storageTexture = arg1;
        },
        __wbg_set_texture_39ac35f54ef4c3ba: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_texture_c89ca659682f2fd6: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_timestamp_writes_90e77f617d9af260: function(arg0, arg1) {
            arg0.timestampWrites = arg1;
        },
        __wbg_set_type_6cc967b44400577b: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
        },
        __wbg_set_type_dd6c71bc279b420e: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
        },
        __wbg_set_usage_1d663151adcb7f1a: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_63cd5e88050b26e8: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_6c4bd5f209a0579c: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_view_dimension_ce6e77a9eb67aa53: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_dimension_d5c87d8c6f1266b5: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_formats_ea87e3d240842107: function(arg0, arg1, arg2) {
            arg0.viewFormats = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_visibility_f68d6576737b8b45: function(arg0, arg1) {
            arg0.visibility = arg1 >>> 0;
        },
        __wbg_set_width_5f89a551b5472887: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_eb3001e1dcabb909: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_fc76d04c0309b403: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_x_aa58610e8a2b3347: function(arg0, arg1) {
            arg0.x = arg1 >>> 0;
        },
        __wbg_set_y_6a3e943d5ad07e0d: function(arg0, arg1) {
            arg0.y = arg1 >>> 0;
        },
        __wbg_set_z_dc1a88e5f0e1508d: function(arg0, arg1) {
            arg0.z = arg1 >>> 0;
        },
        __wbg_shaderSource_519d0f56b613b2f9: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_shaderSource_c4c06a3cbc2e7bf3: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_stack_575c4e0918581b9c: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_003ee833af9699fc: function() {
            const ret = typeof globalThis === 'undefined' ? undefined : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_e4293fb22cbe77da: function() {
            const ret = typeof global === 'undefined' ? undefined : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_53bb20457401453d: function() {
            const ret = typeof self === 'undefined' ? undefined : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_b5e0810bfecb7feb: function() {
            const ret = typeof window === 'undefined' ? undefined : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_stencilFuncSeparate_bd578fbb298ad0e6: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
        },
        __wbg_stencilFuncSeparate_c4e19ab2f6a233b9: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
        },
        __wbg_stencilMaskSeparate_41c3f5591b508051: function(arg0, arg1, arg2) {
            arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_stencilMaskSeparate_b009d9ab29dc5926: function(arg0, arg1, arg2) {
            arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_stencilMask_1fe24adb96500c11: function(arg0, arg1) {
            arg0.stencilMask(arg1 >>> 0);
        },
        __wbg_stencilMask_6d5dbf91337de94e: function(arg0, arg1) {
            arg0.stencilMask(arg1 >>> 0);
        },
        __wbg_stencilOpSeparate_9a2068a0767d6507: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_stencilOpSeparate_f4319497016868f8: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_submit_c4379e221512d3fa: function(arg0, arg1, arg2) {
            arg0.submit(getArrayJsValueViewFromWasm0(arg1, arg2));
        },
        __wbg_texImage2D_20b5002326193fe6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_5048d2cd8540da16: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_84bdef619a1ea935: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage3D_5b7fe3781e1db22a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
        }, arguments); },
        __wbg_texImage3D_abf2fdb0f8c4c1b6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
        }, arguments); },
        __wbg_texParameteri_0afc5d515132fed2: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texParameteri_e24e4fdc17153838: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texStorage2D_e0ebb5940fa1fc5e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_texStorage3D_a82e5be79cb278dc: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
        },
        __wbg_texSubImage2D_0fed1a7412bc7a63: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_1434c994889108aa: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_4343af4633b8b8f8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_4aef07460a86c81e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_9c7e2d1250b1f95f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_a26a8700e734449a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_a271f112c3b60b18: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_baff05c8a8de2e17: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage3D_00e908f23d33228d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_286489de7bf7239a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_32223c3dd7dcdd78: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_5e8b27dc040faf8d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_b1b631c3011a209e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_e8f20815b70bc7cb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_texSubImage3D_ed8982daddcccd1e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
        }, arguments); },
        __wbg_then_656f253a5dd7d8ea: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_e3f7f2d365708be8: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_unconfigure_7ca436ff70c0bcc3: function(arg0) {
            arg0.unconfigure();
        },
        __wbg_uniform1f_0b36dc15cb2b4991: function(arg0, arg1, arg2) {
            arg0.uniform1f(arg1, arg2);
        },
        __wbg_uniform1f_fe417acc7c7a1dc5: function(arg0, arg1, arg2) {
            arg0.uniform1f(arg1, arg2);
        },
        __wbg_uniform1i_385ebc488d4d763f: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform1i_778a02a48ecdceed: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform1ui_79071fccd0396b88: function(arg0, arg1, arg2) {
            arg0.uniform1ui(arg1, arg2 >>> 0);
        },
        __wbg_uniform2fv_486658e6bcddfbaf: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2fv_71fe605c72879b61: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2iv_80c1acefe7258756: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2iv_d6efe574c69f5aed: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2uiv_f9619772d6706c37: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
        },
        __wbg_uniform3fv_431207a9407b7d29: function(arg0, arg1, arg2, arg3) {
            arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform3fv_58fa948c65cb5f6c: function(arg0, arg1, arg2, arg3) {
            arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform3iv_11889262cf74698c: function(arg0, arg1, arg2, arg3) {
            arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform3iv_e9d02a45a4149457: function(arg0, arg1, arg2, arg3) {
            arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform3uiv_b71a1165273e4af4: function(arg0, arg1, arg2, arg3) {
            arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
        },
        __wbg_uniform4f_14a3638afe93aa8f: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_uniform4f_5c31fb6dab645ad8: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_uniform4fv_a1415c11925ac651: function(arg0, arg1, arg2, arg3) {
            arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform4fv_d3afea28181f5342: function(arg0, arg1, arg2, arg3) {
            arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform4iv_c9e8520342091b0a: function(arg0, arg1, arg2, arg3) {
            arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform4iv_fa18eabf499f4df7: function(arg0, arg1, arg2, arg3) {
            arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
        },
        __wbg_uniform4uiv_7a5b848aa1084b38: function(arg0, arg1, arg2, arg3) {
            arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
        },
        __wbg_uniformBlockBinding_61c5a97721e0f36b: function(arg0, arg1, arg2, arg3) {
            arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_uniformMatrix2fv_0a42d3c91d7cb169: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix2fv_8b3774cc1f2dd2af: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix2x3fv_f9e50997fac55ae7: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix2x4fv_080d208b4f9c72be: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3fv_15b2b1f5505b8506: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3fv_df1958f8b617c8d6: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3x2fv_6730abc8ef13d7d3: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3x4fv_3eb72e0d85856655: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_cd0ba72d1d780759: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_edd2b51dbb1caffd: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4x2fv_b0c23910facd8e86: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4x3fv_b6f9b241f392f245: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_unmap_073211b910c6a369: function(arg0) {
            arg0.unmap();
        },
        __wbg_useProgram_d9c24a7d8632c4c1: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_useProgram_f6341ea2eeea1e5a: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_valueOf_2ad4a09774ac959e: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_value_e0f328965e184931: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_vertexAttribDivisorANGLE_5bec9a774ccd1cf8: function(arg0, arg1, arg2) {
            arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_vertexAttribDivisor_5b64fc697c0496e1: function(arg0, arg1, arg2) {
            arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_vertexAttribIPointer_a6240b64263fb63b: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_vertexAttribPointer_39b706eb26c50057: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_vertexAttribPointer_9e0e4517b8d274bd: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_viewport_aaac6dd8cff1831a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_viewport_cdae9e8b2f33343d: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_warn_228ff2257384d295: function(arg0) {
            console.warn(arg0);
        },
        __wbg_writeBuffer_dbc00ede89a23b5e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5, arg6);
        }, arguments); },
        __wbg_writeTexture_ddcddb10ef4a4155: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeTexture(arg1, getArrayU8FromWasm0(arg2, arg3), arg4, arg5);
        }, arguments); },
        __wbindgen_generic_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 6989, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___JsValue__core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_);
            return ret;
        },
        __wbindgen_generic_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUDevice")], shim_idx: 4848, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_);
            return ret;
        },
        __wbindgen_generic_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUUncapturedErrorEvent")], shim_idx: 4950, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuDeviceLostInfo__GpuDeviceLostInfo______true_);
            return ret;
        },
        __wbindgen_generic_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("any")], shim_idx: 4848, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__481);
            return ret;
        },
        __wbindgen_generic_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("undefined")], shim_idx: 4848, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__482);
            return ret;
        },
        __wbindgen_generic_0000000000000006: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_generic_0000000000000007: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_generic_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
            const ret = getArrayF32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
            const ret = getArrayI16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000a: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
            const ret = getArrayI32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
            const ret = getArrayI8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
            const ret = getArrayU16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000d: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
            const ret = getArrayU32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000e: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000010: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_generic_0000000000000011: function(arg0, arg1) {
            var v0 = getArrayF32FromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            // Cast intrinsic for `Vector(F32) -> Externref`.
            const ret = v0;
            return ret;
        },
        __wbindgen_generic_0000000000000012: function(arg0, arg1) {
            var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 1, 1);
            // Cast intrinsic for `Vector(U8) -> Externref`.
            const ret = v0;
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            table.set(0, undefined);
            table.set(1024, undefined);
            table.set(1025, null);
            table.set(1026, true);
            table.set(1027, false);
        },
    };
    return {
        __proto__: null,
        "./vcad_kernel_wasm_bg.js": import0,
    };
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuDeviceLostInfo__GpuDeviceLostInfo______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuDeviceLostInfo__GpuDeviceLostInfo______true_(arg0, arg1, arg2);
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___JsValue__core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___JsValue__core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__481(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__481(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__482(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___wasm_bindgen_84df2d7dc6f28eed___sys__JsNullable_wgpu_253176a6c301da59___backend__webgpu__webgpu_sys__gen_GpuError__GpuError___core_d941ad8722425d2e___result__Result_____wasm_bindgen_84df2d7dc6f28eed___JsError___true__482(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen_84df2d7dc6f28eed___convert__closures_____invoke___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined___js_sys_fa423694c064de4b___Function_fn_wasm_bindgen_84df2d7dc6f28eed___JsValue_____wasm_bindgen_84df2d7dc6f28eed___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_GpuAutoLayoutMode = ["auto"];


const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];


const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];


const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];


const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];


const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];


const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];


const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];


const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];


const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];
const CircuitSimFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_circuitsim_free(ptr, 1));
const IncrementalEvaluatorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_incrementalevaluator_free(ptr, 1));
const MdSimFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_mdsim_free(ptr, 1));
const PhysicsSimFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_physicssim_free(ptr, 1));
const RayTracerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_raytracer_free(ptr, 1));
const SliceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sliceresult_free(ptr, 1));
const SlicerSettingsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_slicersettings_free(ptr, 1));
const SolidFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_solid_free(ptr, 1));
const WasmAnnotationLayerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmannotationlayer_free(ptr, 1));
const WasmCamSettingsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmcamsettings_free(ptr, 1));
const WasmDocumentEngineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmdocumentengine_free(ptr, 1));
const WasmKeybindingsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmkeybindings_free(ptr, 1));
const WasmSketchSessionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmsketchsession_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    switch (typeof val) {
        // primitive types
        case 'number':
        case 'boolean':
        case 'undefined':
        return `${val}`;
        case 'string':
        return JSON.stringify(val);
        case 'bigint':
        return `${val}n`;
        case 'symbol':
        return val.description !== undefined
            ? `Symbol(${val.description})`
            : 'Symbol';
        case 'function':
        return typeof val.name === 'string' && val.name !== ''
            ? `Function(${val.name})`
            : 'Function';
        case 'object': {
            if (val === null) {
                return 'null';
            }
            // objects
            if (Array.isArray(val)) {
                return '[' + Array.from(val, debugString).join(', ') + ']';
            }
            // errors
            if (val instanceof Error) {
                return `${val.name}: ${val.message}\n${val.stack}`;
            }

            const toStringOutput = toString.call(val);
            // Test for built-in
            const className = /\[object ([^\]]+)\]/.exec(toStringOutput)?.[1];

            // Failed to match the standard '[object ClassName]'
            if (className === undefined) {
                return toStringOutput;
            }
            if (className === 'Object') {
                // we're a user defined class or Object
                // JSON.stringify avoids problems with cycles, and is generally much
                // easier than looping through ownProperties of `val`.
                try {
                    return 'Object(' + JSON.stringify(val) + ')';
                } catch (_) {
                    return 'Object';
                }
            }
            // TODO we could test for more things here, like `Set`s and `Map`s.
            return className;
        }
        // Per MDN: 'This list of values is exhaustive.'
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
    }
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayJsValueViewFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(bytes) {
    numBytesDecoded += bytes.length;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
        cachedTextDecoder.decode();
        numBytesDecoded = bytes.length;
    }
    return cachedTextDecoder.decode(bytes);
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

let __wbg_init_promise;
async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;
    if (__wbg_init_promise === undefined) {
        __wbg_init_promise = __wbg_init_once(module_or_path);
        __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
    }
    return __wbg_init_promise;
}

async function __wbg_init_once(module_or_path) {

    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('vcad_kernel_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };

// vcad: trap-recovery hook (appended by packages/kernel-wasm build).
// Dropping the cached `wasm`/`wasmModule` bindings lets a subsequent
// initSync()/default() re-instantiate a fresh instance in place, so the
// wasm-singleton can recover from a panic trap instead of poisoning the
// process. See packages/engine/src/wasm-singleton.ts (resetKernelWasm).
export function __vcad_reset_wasm() {
    wasm = undefined;
    wasmModule = undefined;
}
