module.exports = {
    params: {
        designator: 'MCU',
        side: 'F',
        reversible: false,

        P0: { type: 'net', value: 'P0' },
        P1: { type: 'net', value: 'P1' },
        P2: { type: 'net', value: 'P2' },
        P3: { type: 'net', value: 'P3' },
        P4: { type: 'net', value: 'P4' },
        P5: { type: 'net', value: 'P5' },
        P6: { type: 'net', value: 'P6' },
        P7: { type: 'net', value: 'P7' },
        P8: { type: 'net', value: 'P8' },
        P9: { type: 'net', value: 'P9' },
        P10: { type: 'net', value: 'P10' },

        RAW3V3: { type: 'net', value: '3V3' },
        GND: { type: 'net', value: 'GND' },
        RAW5V: { type: 'net', value: '5V' },

        SWCLK: { type: 'net', value: 'SWCLK' },
        SWDIO: { type: 'net', value: 'SWDIO' },
        RST: { type: 'net', value: 'RST' },
        BAT_POS: { type: 'net', value: 'BAT_POS' },
        BAT_NEG: { type: 'net', value: 'BAT_NEG' },
        NFC1: { type: 'net', value: 'NFC1' },
        NFC2: { type: 'net', value: 'NFC2' },
    },
    body: p => {
        const flip = p.side === "B";
        if (!flip && p.side !== "F") throw new Error('unsupported side: ' + p.side);

        // surface pads for pins
        const static_pads = `
            (pad "1" thru_hole oval (at -7.62 -7.62 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P0})
            (pad "2" thru_hole oval (at -7.62 -5.08 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P1})
            (pad "3" thru_hole oval (at -7.62 -2.54 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P2})
            (pad "4" thru_hole oval (at -7.62 0.0 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P3})
            (pad "5" thru_hole oval (at -7.62 2.54 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P4})
            (pad "6" thru_hole oval (at -7.62 5.08 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P5})
            (pad "7" thru_hole oval (at -7.62 7.62 ${p.r + 0}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P6})
            (pad "8" thru_hole oval (at 7.62 7.62 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P7})
            (pad "9" thru_hole oval (at 7.62 5.08 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P8})
            (pad "10" thru_hole oval (at 7.62 2.54 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P9})
            (pad "11" thru_hole oval (at 7.62 0.0 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.P10})
            (pad "12" thru_hole oval (at 7.62 -2.54 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.RAW3V3})
            (pad "13" thru_hole oval (at 7.62 -5.08 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.GND})
            (pad "14" thru_hole oval (at 7.62 -7.62 ${p.r + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.RAW5V})

            ${'' /* through hole pads for pads on back */}
            (pad "15" thru_hole circle (at -1.27 -8.572 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.SWCLK})
            (pad "16" thru_hole circle (at 1.27 -8.572 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.SWDIO})
            (pad "17" thru_hole circle (at -1.27 -6.032 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.GND})
            (pad "18" thru_hole circle (at 1.27 -6.032 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.RST})
        `;

        // through hole pads for pads on back
        const flippable_pads = `
            (pad "19" thru_hole circle (at -4.445 -0.317 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.BAT_POS})
            (pad "20" thru_hole circle (at -4.445 -2.222 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.BAT_NEG})
            (pad "21" thru_hole circle (at 3.802408 8.801408 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.NFC1})
            (pad "22" thru_hole circle (at 5.707408 8.801408 ${p.r}) (size 1.397 1.397) (drill 1.016) (layers "*.Cu" "*.Mask") (remove_unused_layers no)  ${p.NFC2})
        `;

        // kicad drc error: board edge clearance violation near arc edge cuts should be false alarm
        const static_cuts = `
            ${'' /* sw and rst */}
            (fp_line (start -1.524 -8.1402) (end -1.524 -6.4638) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start -0.8382 -8.826) (end 0.8382 -8.826) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start -0.8382 -5.778) (end 0.8382 -5.778) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start 1.524 -8.1402) (end 1.524 -6.4638) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -1.524 -6.4638) (mid -0.920405 -6.381691) (end -0.838133 -5.778118) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -0.8382 -8.826) (mid -0.920309 -8.222405) (end -1.523882 -8.140133) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 0.8382 -5.778) (mid 0.920405 -6.381522) (end 1.523933 -6.463681) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 1.524 -8.1402) (mid 0.920405 -8.222308) (end 0.838133 -8.825881) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
        `;

        const flippable_cuts = `
            ${'' /* bat */}
            (fp_line (start -4.699 -1.7902) (end -4.699 -0.7488) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start -4.0132 -2.476) (end -2.413 -2.476) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start -4.0132 -0.063) (end -2.413 -0.063) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start -2.032 -2.095) (end -2.032 -0.444) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -4.699 -0.7488) (mid -4.095402 -0.666688) (end -4.013137 -0.063111) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -4.0132 -2.476) (mid -4.095312 -1.872402) (end -4.698889 -1.790137) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -2.413 -2.476) (mid -2.143592 -2.364407) (end -2.032 -2.094998) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start -2.032 -0.444) (mid -2.143593 -0.174592) (end -2.413002 -0.063) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )

            ${'' /* nfc */}
            (fp_line (start 3.548408 6.769408) (end 3.548408 8.369608) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start 3.929408 6.388408) (end 5.580408 6.388408) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start 4.234208 9.055408) (end 5.275608 9.055408) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_line (start 5.961408 6.769408) (end 5.961408 8.369608) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 3.548408 6.769392) (mid 3.660009 6.499987) (end 3.929424 6.388408) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 3.548408 8.369608) (mid 4.152091 8.451796) (end 4.234301 9.055476) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 5.275608 9.055408) (mid 5.35788 8.451784) (end 5.961527 8.369675) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
            (fp_arc (start 5.580408 6.388408) (mid 5.849808 6.500004) (end 5.961392 6.769408) (stroke (width 0.12) (type solid)) (layer "Edge.Cuts") )
        `;



        // parts on both sides
        const top = `
            (footprint "mcu_xiao_ble"
                (layer "${p.side}.Cu")
                ${p.at /* parametric position */}
                (property "Reference" "${p.ref}"
                  (at 0 -15 ${p.r})
                  (layer "${p.side}.SilkS")
                  ${p.ref_hide}
                  (effects (font (size 1 1) (thickness 0.15)))
                )
                (attr smd exclude_from_pos_files exclude_from_bom)

                ${'' /* controller outline */}
                (fp_rect (start -8.89 10.5) (end 8.89 -10.5) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
                ${'' /* 9.0018 by 1.5079 usb connector overhang */}
                (fp_rect (start -4.5009 -10.5) (end 4.5009 -12.0079) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
                ${'' /* weird controller pads that don't do anything */}
                (fp_rect (start -5.285811 -6.785813) (end -3.507811 -4.118813) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
                (fp_rect (start -3.507811 -8.182813) (end -5.285811 -10.849813) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
                (fp_rect (start 3.350197 -10.849813) (end 5.128197 -8.182813) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
                (fp_rect (start 3.350197 -6.785813) (end 5.128197 -4.118813) (stroke (width 0.12) (type solid)) (fill no) (layer "Dwgs.User") )
        `;

        // parts only on front
        const front = `
            ${flipped_y_axis(flippable_pads, false)}
            ${flipped_y_axis(flippable_cuts, false)}
        `;

        // parts only on back
        const back = `
            ${flipped_y_axis(flippable_pads, true)}
            ${flipped_y_axis(flippable_cuts, true)}
        `;

        // parts on both sides with closing parentheses
        const bottom = `
            ${'' /* HACK: only generate certain pads so reversible does not stack and conflict pads */}
            ${'' /* use local_net and vias like in https://github.com/ceoloide/ergogen-footprints/blob/main/mcu_nice_nano.js  */}
            ${static_pads}
            ${static_cuts}
        )
        `;

        let final = top;

        if (p.side == "F" || p.reversible) {
            final += front;
        }
        if (p.side == "B" || p.reversible) {
            final += back;
        }

        final += bottom;

        return final;
    }
}
function normalizeAngle(angle) {
    angle = angle % 360;
    if (angle <= -180) angle += 360;
    else if (angle > 180) angle -= 360;
    return angle;
}

function flipped_y_axis(s, flip) {
    if (flip === false) {
        return s;
    }

    const re = /\((start|mid|end|at) (-?[\d\.]*) (-?[\d\.]*)(?: (-?[\d\.]*))?\)/gm;
    function replacer(match, type, x, y, r) {
        const flipped_x = x.startsWith("-") ? x.slice(1) : `-${x}`;
        const flipped_r = normalizeAngle(parseFloat(r) + 180)
        const r_str = r === undefined ? "" : ` ${flipped_r.toFixed(3)}`;
        return `(${type} ${flipped_x} ${y}${r_str})`
    };

    return s.replaceAll(re, replacer);
}
