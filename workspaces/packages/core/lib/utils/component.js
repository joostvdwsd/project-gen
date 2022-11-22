"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(parent) {
        this.allComponents = [];
        this.children = [];
        if (parent) {
            parent.addChild(this);
        }
    }
    setParent(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    getRoot() {
        if (this.parent) {
            return this.parent.getRoot();
        }
        return this;
    }
    find(componentType) {
        var _a;
        if (this instanceof componentType) {
            return this;
        }
        const result = this.children.find((component) => component instanceof componentType);
        if (result) {
            return result;
        }
        const parentResult = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.find(componentType);
        if (parentResult) {
            return parentResult;
        }
        return this.getRoot().allComponents.find((component) => component instanceof componentType);
    }
    resolve(componentType) {
        const result = this.find(componentType);
        if (!result) {
            throw new Error(`Required component '${componentType}' not found`);
        }
        return result;
    }
    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     */
    addChild(component) {
        this.children.push(component);
        component.setParent(this);
        this.getRoot().allComponents.push(component);
    }
    removeChild(component) {
        const allComponentIndex = this.getRoot().allComponents.indexOf(component);
        this.getRoot().allComponents.splice(allComponentIndex, 1);
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    }
    async preSynthesize() {
        await Promise.all(this.children.map((component) => component.preSynthesize()));
    }
    async synthesize() {
        await Promise.all(this.children.map((component) => component.synthesize()));
    }
    async postSynthesize() {
        await Promise.all(this.children.map((component) => component.postSynthesize()));
    }
}
exports.Component = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLFNBQVM7SUF1RXBCLFlBQVksTUFBa0I7UUFuRXBCLGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUVoQyxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQWtFbkMsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQW5FTSxTQUFTLENBQUMsTUFBd0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxJQUFJLENBQXNCLGFBQTJCOztRQUMxRCxJQUFJLElBQUksWUFBWSxhQUFhLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLFlBQVksYUFBYSxDQUFNLENBQUM7UUFDMUYsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsTUFBTSxZQUFZLEdBQUcsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLFlBQVksYUFBYSxDQUFNLENBQUM7SUFDbkcsQ0FBQztJQUVNLE9BQU8sQ0FBc0IsYUFBMkI7UUFDN0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsYUFBYSxhQUFhLENBQUMsQ0FBQztTQUNwRTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRLENBQUMsU0FBb0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sV0FBVyxDQUFDLFNBQW9CO1FBQ3JDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQVFELEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDN0UsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqRixDQUFDO0NBQ0Y7QUF4RkQsOEJBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgdHlwZSBDbGFzc1R5cGU8VD4gPSBuZXcgKC4uLmFyZ3M6IFsuLi5hbnldKSA9PiBUO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcblxuICBwcml2YXRlIHBhcmVudCE6IENvbXBvbmVudCB8IG51bGw7XG5cbiAgcHJvdGVjdGVkIGFsbENvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW107XG5cbiAgcHJvdGVjdGVkIGNoaWxkcmVuOiBDb21wb25lbnRbXSA9IFtdO1xuXG4gIHB1YmxpYyBzZXRQYXJlbnQocGFyZW50OiBDb21wb25lbnQgfCBudWxsKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGFyZW50KCk6IENvbXBvbmVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSb290KCk6IENvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Um9vdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBmaW5kPFQgZXh0ZW5kcyBDb21wb25lbnQ+KGNvbXBvbmVudFR5cGU6IENsYXNzVHlwZTxUPik6IFQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgY29tcG9uZW50VHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGlsZHJlbi5maW5kKChjb21wb25lbnQpID0+IGNvbXBvbmVudCBpbnN0YW5jZW9mIGNvbXBvbmVudFR5cGUpIGFzIFQ7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRSZXN1bHQgPSB0aGlzLnBhcmVudD8uZmluZChjb21wb25lbnRUeXBlKTtcblxuICAgIGlmIChwYXJlbnRSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJlbnRSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Um9vdCgpLmFsbENvbXBvbmVudHMuZmluZCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQgaW5zdGFuY2VvZiBjb21wb25lbnRUeXBlKSBhcyBUO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmU8VCBleHRlbmRzIENvbXBvbmVudD4oY29tcG9uZW50VHlwZTogQ2xhc3NUeXBlPFQ+KTogVCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maW5kKGNvbXBvbmVudFR5cGUpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVpcmVkIGNvbXBvbmVudCAnJHtjb21wb25lbnRUeXBlfScgbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQSBjb21wb3NpdGUgb2JqZWN0IGNhbiBhZGQgb3IgcmVtb3ZlIG90aGVyIGNvbXBvbmVudHMgKGJvdGggc2ltcGxlIG9yXG4gICAqIGNvbXBsZXgpIHRvIG9yIGZyb20gaXRzIGNoaWxkIGxpc3QuXG4gICAqL1xuICBwdWJsaWMgYWRkQ2hpbGQoY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goY29tcG9uZW50KTtcbiAgICBjb21wb25lbnQuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgdGhpcy5nZXRSb290KCkuYWxsQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBhbGxDb21wb25lbnRJbmRleCA9IHRoaXMuZ2V0Um9vdCgpLmFsbENvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpO1xuICAgIHRoaXMuZ2V0Um9vdCgpLmFsbENvbXBvbmVudHMuc3BsaWNlKGFsbENvbXBvbmVudEluZGV4LCAxKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudEluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbXBvbmVudCk7XG4gICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoY29tcG9uZW50SW5kZXgsIDEpO1xuXG4gICAgY29tcG9uZW50LnNldFBhcmVudChudWxsKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmVudD86IENvbXBvbmVudCkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hZGRDaGlsZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVTeW50aGVzaXplKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuY2hpbGRyZW4ubWFwKChjb21wb25lbnQpID0+IGNvbXBvbmVudC5wcmVTeW50aGVzaXplKCkpKVxuICB9XG5cbiAgYXN5bmMgc3ludGhlc2l6ZSgpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmNoaWxkcmVuLm1hcCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQuc3ludGhlc2l6ZSgpKSlcbiAgfVxuXG4gIGFzeW5jIHBvc3RTeW50aGVzaXplKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuY2hpbGRyZW4ubWFwKChjb21wb25lbnQpID0+IGNvbXBvbmVudC5wb3N0U3ludGhlc2l6ZSgpKSlcbiAgfVxufVxuIl19