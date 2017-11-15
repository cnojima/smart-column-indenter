import * as assert from 'assert';
import Indenter from '../src/Indenter';
import Config from '../src/Config';

function test(extension: string, code: string, expected: string, config?: Config): void {
    let indenter = new Indenter(code, extension, config);
    let result = indenter.indent();

    assert.equal(result, expected, "The indentation is different than the expected.");
}

describe('Indenter', () => {

    describe('indent()', () => {

        it('test 1', () => {
            const code = `
                import * as assert from 'assert';
                import Indenter from '../src/Indenter';
            `;

            const expected = `
                import * as assert from 'assert'         ;
                import Indenter    from '../src/Indenter';
            `;

            test("ts", code, expected);
        });


        it('test 2', () => {
            const code = `
                const codeWithoutIndentation = code.replace(/ /g, "").replace(/\\r\\n|\\r|\\n/, "\\n").trim();
                const indentedCodeWithoutIndentation = indentedCode.replace(/ /g, "").replace(/\\r\\n|\\r|\\n/, "\\n").trim();
            `;

            const expected = `
                const codeWithoutIndentation         = code        .replace(/ /g, "").replace(/\\r\\n|\\r|\\n/g, "\\n").trim();
                const indentedCodeWithoutIndentation = indentedCode.replace(/ /g, "").replace(/\\r\\n|\\r|\\n/g, "\\n").trim();
            `;

            test("ts", code, expected);
        });


        it('test 3', () => {
            const code = `
                { label: 'Descrição', name: 'Nome', width: 200, align: 'left', hidden: false, editable: true, edittype: 'text' },
                { label: 'Unidade de&nbsp;Medida', name: 'UnidadeMedida', width: 100, align: 'left', hidden: modOuMoi, editable: false, edittype: 'text' },
                { label: 'Qtd.<br/>Insumo*', name: 'QuantidadeInsumo', width: 100, align: 'right', hidden: false, editable: true, edittype: 'text', formatter: 'number', formatoptions: formatter4c, editoptions: { maxlength: "14", class: 'decimal' } },
                { label: 'Qtd.<br/>Auxiliar*', name: 'QuantidadeAuxiliar', width: 100, align: 'right', hidden: modOuMoi, editable: true, edittype: 'text', formatter: 'number', formatoptions: formatter4c, editoptions: { maxlength: "14", class: 'decimal' } },
                { label: 'Cronograma*', name: 'Cronograma', width: 100, align: 'left', hidden: !modOuMoi, editable: modOuMoi, edittype: 'select', formatter: 'select', editoptions: { value: valuesCron } },
                { label: 'Regime&nbsp;de Trabalho*', name: 'Regime', width: 100, align: 'left', hidden: !modOuMoi, editable: modOuMoi, edittype: 'select', formatter: 'select', editoptions: { value: valuesReg } },
                { label: 'Fator Multiplicador*', name: 'FatorMultiplicador', width: 100, align: 'right', hidden: false, editable: true, edittype: 'text', formatter: 'number', formatoptions: formatter4c, editoptions: { maxlength: "8", class: 'decimal' } },
                { label: 'Fator Mês*', name: 'FatorMes', width: 100, align: 'right', hidden: !modOuMoi, editable: false, edittype: 'text', formatter: 'number', formatoptions: formatter2c },
                { label: 'Total&nbsp;Impedimento<br/>(%)*', name: 'TotalImpedimento', width: 100, align: 'right', hidden: false, editable: false, edittype: 'text', formatter: 'number', formatoptions: formatter4c },
                { label: 'Encargos&nbsp;Sociais<br/>(%)*', name: 'EncargosSociais', width: 100, align: 'right', hidden: !modOuMoi, editable: false, edittype: 'text', formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula },
                { label: labelValorUnitario, name: 'ValorUnitario', width: 100, align: 'right', hidden: false, editable: true, edittype: 'text', formatter: 'number', formatoptions: formatter2c, editoptions: { maxlength: "14", class: 'decimal11_2' } },
                { label: 'Salário<br/>(R$)', name: 'Salario', width: 100, align: 'right', hidden: !modOuMoi, editable: false, edittype: 'text', formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula },
                { label: 'Valor&nbsp;Total<br/>(R$)', name: 'ValorTotal', width: 100, align: 'right', hidden: false, editable: false, edittype: 'text', formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula },
                { label: 'Estimativa', name: 'Estimativa', width: 100, align: 'left', hidden: true, editable: false, edittype: 'text' },
                { label: 'Unidade de Medida (hint)', name: 'UnidadeMedidaDescricao', width: 100, align: 'left', hidden: true, editable: false, edittype: 'text' }
            `;
            
            const expected = `
                { label: 'Descrição'                      , name: 'Nome'                  , width: 200, align: 'left' , hidden: false     , editable: true    , edittype: 'text'                                                                                                                  },
                { label: 'Unidade de&nbsp;Medida'         , name: 'UnidadeMedida'         , width: 100, align: 'left' , hidden: modOuMoi  , editable: false   , edittype: 'text'                                                                                                                  },
                { label: 'Qtd.<br/>Insumo*'               , name: 'QuantidadeInsumo'      , width: 100, align: 'right', hidden: false     , editable: true    , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter4c, editoptions: { maxlength: "14", class: 'decimal'     } },
                { label: 'Qtd.<br/>Auxiliar*'             , name: 'QuantidadeAuxiliar'    , width: 100, align: 'right', hidden: modOuMoi  , editable: true    , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter4c, editoptions: { maxlength: "14", class: 'decimal'     } },
                { label: 'Cronograma*'                    , name: 'Cronograma'            , width: 100, align: 'left' , hidden: !modOuMoi , editable: modOuMoi, edittype: 'select', formatter: 'select'      ,                             editoptions: { value: valuesCron                     } },
                { label: 'Regime&nbsp;de Trabalho*'       , name: 'Regime'                , width: 100, align: 'left' , hidden: !modOuMoi , editable: modOuMoi, edittype: 'select', formatter: 'select'      ,                             editoptions: { value: valuesReg                      } },
                { label: 'Fator Multiplicador*'           , name: 'FatorMultiplicador'    , width: 100, align: 'right', hidden: false     , editable: true    , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter4c, editoptions: { maxlength: "8" , class: 'decimal'     } },
                { label: 'Fator Mês*'                     , name: 'FatorMes'              , width: 100, align: 'right', hidden: !modOuMoi , editable: false   , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter2c                                                         },
                { label: 'Total&nbsp;Impedimento<br/>(%)*', name: 'TotalImpedimento'      , width: 100, align: 'right', hidden: false     , editable: false   , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter4c                                                         },
                { label: 'Encargos&nbsp;Sociais<br/>(%)*' , name: 'EncargosSociais'       , width: 100, align: 'right', hidden: !modOuMoi , editable: false   , edittype: 'text'  , formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula                                 },
                { label: labelValorUnitario               , name: 'ValorUnitario'         , width: 100, align: 'right', hidden: false     , editable: true    , edittype: 'text'  , formatter: 'number'      , formatoptions: formatter2c, editoptions: { maxlength: "14", class: 'decimal11_2' } },
                { label: 'Salário<br/>(R$)'               , name: 'Salario'               , width: 100, align: 'right', hidden: !modOuMoi , editable: false   , edittype: 'text'  , formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula                                 },
                { label: 'Valor&nbsp;Total<br/>(R$)'      , name: 'ValorTotal'            , width: 100, align: 'right', hidden: false     , editable: false   , edittype: 'text'  , formatter: formatFormulaI, formatoptions: formatter2c, sorttype: orderFormula                                 },
                { label: 'Estimativa'                     , name: 'Estimativa'            , width: 100, align: 'left' , hidden: true      , editable: false   , edittype: 'text'                                                                                                                  },
                { label: 'Unidade de Medida (hint)'       , name: 'UnidadeMedidaDescricao', width: 100, align: 'left' , hidden: true      , editable: false   , edittype: 'text'                                                                                                                  }
            `;

            test("js", code, expected);
        });

    });

});
