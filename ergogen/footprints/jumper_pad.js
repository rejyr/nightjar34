// adapted from ceoloide/mcu_nice_nano
module.exports = {
  params: {
    designator: '',
    side: 'F',
    reversible: false,
    P_1_1: { type: 'net', value: 'P_1_1' },
    P_1_2: { type: 'net', value: 'P_1_2' },
    P_2_1: { type: 'net', value: 'P_2_1' },
    P_2_2: { type: 'net', value: 'P_2_2' },
  },
  body: p => {
    if (p.side !== "F" && p.side !== "B") throw new Error('unsupported side: ' + p.side);

    let jumpers = '';
    if (p.reversible) {
      jumpers = gen_jumper(p, "F", "11", "12", p.P_1_1, p.P_1_2)
      jumpers += gen_jumper(p, "B", "21", "22", p.P_2_1, p.P_2_2)
    } else {
      jumpers = gen_jumper(p, p.side, `${p.padn_pre}0`, `${p.padn_pre}1`, p.P_1_1, p.P_1_2)
    }

    const standard_opening = `
    (footprint "jumper"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 4.8 ${p.r})
            (layer "${p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        `;
    const standard_closing = `
    )
        `;
    return `
        ${standard_opening}
        ${jumpers}
        ${standard_closing}
    `;
  }
}
function gen_jumper(p, side, padn_left, padn_right, net_left, net_right) {
  return `
    (pad "${padn_left}" smd rect (at -0.45 0 ${p.r}) (size 0.6 1.2) (layers "${side}.Cu" "${side}.Paste" "${side}.Mask") ${net_left})
    (pad "${padn_right}" smd rect (at 0.45 0 ${p.r}) (size 0.6 1.2) (layers "${side}.Cu" "${side}.Paste" "${side}.Mask") ${net_right})
  `;
}