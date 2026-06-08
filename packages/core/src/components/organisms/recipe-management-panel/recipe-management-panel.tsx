import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { SelectOption } from '../../atoms/select/select';
import type { BatchParam } from '../batch-control-panel/batch-control-panel';

/**
 * Recipe management panel: pick / load a recipe, review its parameter set and
 * save edits. Combines `<ind-recipe-selector>` with a parameter list.
 */
@Component({
  tag: 'ind-recipe-management-panel',
  styleUrls: ['../_shared/panel.css', '../_shared/control-panel.css', 'recipe-management-panel.css'],
  shadow: true,
})
export class IndRecipeManagementPanel {
  @Prop() heading: string = 'Recipe management';
  /** Available recipes. */
  @Prop() recipes: SelectOption[] = [];
  /** Selected recipe (two-way). */
  @Prop({ mutable: true }) value?: string;
  /** Parameters of the selected recipe. */
  @Prop() parameters: BatchParam[] = [];
  /** Allow editing the parameters. */
  @Prop() editable: boolean = false;

  @Event() indChange!: EventEmitter<string>;
  @Event() indLoad!: EventEmitter<string>;
  @Event() indSave!: EventEmitter<void>;

  private onChange = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };
  private onLoad = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.indLoad.emit(e.detail);
  };

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
          <div class="panel-actions">
            <ind-button
              variant="primary"
              size="sm"
              label="Save"
              disabled={!this.editable}
              onIndActivate={() => this.indSave.emit()}
            />
          </div>
        </div>
        <div class="panel-body">
          <ind-recipe-selector
            label="Recipe"
            options={this.recipes}
            value={this.value}
            onIndChange={this.onChange}
            onIndLoad={this.onLoad}
          />
          {this.parameters.length > 0 && (
            <div class="params" part="params">
              {this.parameters.map((p, i) => (
                <ind-batch-parameter-row
                  key={i}
                  label={p.label}
                  value={p.value}
                  unit={p.unit}
                  target={p.target}
                  disabled={!this.editable}
                />
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
