import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AppConnection } from 'shared';
import { AppConnectionsService } from '../../common/service/app-connections.service';
import { ProjectService } from '../../common/service/project.service';

@Injectable({
	providedIn: 'root',
})
export class ConnectionsResolver implements Resolve<AppConnection[]> {
	constructor(private appConnectionsService: AppConnectionsService, private projectService: ProjectService) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppConnection[]> {
		return this.projectService.selectedProjectAndTakeOne().pipe(
			switchMap(project => {
				return this.appConnectionsService.list({ projectId: project.id, limit: 999999 });
			}),
			map(res => {
				return res.data;
			})
		);
	}
}
